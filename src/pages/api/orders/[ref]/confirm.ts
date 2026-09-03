import { timingSafeEqual } from 'node:crypto';
import type { APIRoute } from 'astro';
import { adminToken } from '../../../../lib/config';
import { getOrder, markPaid } from '../../../../lib/orders';

export const prerender = false;

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

function tokenMatches(presented: string): boolean {
  if (adminToken.length === 0 || presented.length !== adminToken.length) return false;
  return timingSafeEqual(Buffer.from(presented), Buffer.from(adminToken));
}

/**
 * Marks an order as paid. This is the hook the bank reconciliation job calls
 * once a SEPA credit carrying the order reference has been matched — either an
 * AIS/PSD2 poller or an operator working from the account statement.
 *
 *   curl -X POST /api/orders/CPD-XXXX-XX/confirm \
 *        -H "authorization: Bearer $COMPUD_ADMIN_TOKEN" \
 *        -d '{"amountCents":182878,"endToEndId":"..."}'
 *
 * Without COMPUD_ADMIN_TOKEN set the endpoint stays closed rather than open.
 */
export const POST: APIRoute = async ({ params, request }) => {
  if (adminToken.length === 0) return json({ error: 'confirmation_disabled' }, 503);

  const presented = (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!tokenMatches(presented)) return json({ error: 'unauthorised' }, 401);

  const ref = params.ref ?? '';
  const existing = await getOrder(ref);
  if (!existing) return json({ error: 'not_found' }, 404);

  let payload: Record<string, unknown> = {};
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    // An empty body is fine: the amount then defaults to the order total.
  }

  const amountCents = Number.isFinite(Number(payload.amountCents))
    ? Number(payload.amountCents)
    : existing.totals.grossCents;

  // A short transfer is not a paid order; flag it instead of shipping.
  if (amountCents < existing.totals.grossCents) {
    return json({ error: 'amount_mismatch', expected: existing.totals.grossCents, received: amountCents }, 409);
  }

  const order = await markPaid(ref, {
    amountCents,
    valueDate: typeof payload.valueDate === 'string' ? payload.valueDate : undefined,
    endToEndId: typeof payload.endToEndId === 'string' ? payload.endToEndId : undefined,
  });
  return json({ ref, status: order?.status ?? 'pending' }, 200);
};
