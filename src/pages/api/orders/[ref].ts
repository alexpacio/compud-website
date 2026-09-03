import type { APIRoute } from 'astro';
import { getOrder } from '../../../lib/orders';

export const prerender = false;

/**
 * Payment status for one order. The order page polls this so the customer sees
 * the credit land without reloading. Deliberately returns nothing but the
 * status: the reference travels by email and is not a secret worth leaking
 * personal data over.
 */
export const GET: APIRoute = async ({ params }) => {
  const order = await getOrder(params.ref ?? '');
  if (!order) {
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
  return new Response(
    JSON.stringify({ ref: order.ref, status: order.status, paidAt: order.paidAt ?? null }),
    { status: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } },
  );
};
