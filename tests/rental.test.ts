import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { addToCart, lineKey, readCart, setRentalMonths } from '../src/lib/cart.ts';
import { isRentalMonths, isRentalProduct, monthlyRentalCents, rentalBuyoutCents, type RentalMonths } from '../src/lib/rental.ts';

test('rental rates apply the agreed markups to the original configured value', () => {
  // A €1,200 configuration: 30% over 12 months, 15% over 24, unchanged over 36.
  assert.equal(monthlyRentalCents(120000, 12), 13000);
  assert.equal(monthlyRentalCents(120000, 24), 5750);
  assert.equal(monthlyRentalCents(120000, 36), 3333);
  // A real €949 catalogue value checks rounding to cents after division.
  assert.equal(monthlyRentalCents(94900, 12), 10281);
  assert.equal(monthlyRentalCents(94900, 24), 4547);
  assert.equal(monthlyRentalCents(94900, 36), 2636);
});

test('buyout is 30% of the original value, independent of rental markup', () => {
  assert.equal(rentalBuyoutCents(120000), 36000);
  assert.equal(rentalBuyoutCents(94900), 28470);
  // Upgrades are part of the original configuration, including odd cents.
  assert.equal(rentalBuyoutCents(94900 + 29999), 37470);
});

test('unsupported rental terms are rejected', () => {
  for (const value of [undefined, null, '12', 0, 18, 48, NaN]) {
    assert.equal(isRentalMonths(value), false);
  }
  assert.throws(() => monthlyRentalCents(94900, 18 as RentalMonths), RangeError);
});

test('rack servers remain purchases while every other catalogue section rents', () => {
  assert.equal(isRentalProduct({ section: 'server' }), false);
  for (const section of [undefined, 'miniPc', 'nas', 'laptop', 'gpu']) {
    assert.equal(isRentalProduct({ section }), true);
  }
});

const storage = new Map<string, string>();
beforeEach(() => {
  storage.clear();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) },
  });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: new EventTarget() });
});

const machine = { slug: 'mini', ram: '16', ssd: '512', os: 'compud', quantity: 1 };

test('the cart preserves and distinguishes rental durations and server purchases', () => {
  addToCart({ ...machine, rentalMonths: 12 });
  addToCart({ ...machine, rentalMonths: 24 });
  addToCart({ ...machine, rentalMonths: 12 });
  addToCart({ ...machine, slug: 'rack' });
  const cart = readCart();
  assert.equal(cart.length, 3);
  assert.equal(cart[0].rentalMonths, 12);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[1].rentalMonths, 24);
  assert.equal(cart[2].rentalMonths, undefined);
});

test('changing the term merges matching configurations and keeps their quantities', () => {
  addToCart({ ...machine, rentalMonths: 12 });
  addToCart({ ...machine, rentalMonths: 24, quantity: 2 });
  setRentalMonths(lineKey({ ...machine, rentalMonths: 12 }), 24);
  assert.equal(readCart().length, 1);
  assert.equal(readCart()[0].rentalMonths, 24);
  assert.equal(readCart()[0].quantity, 3);
});

test('purchase carts and invalid stored rental terms are not silently converted', () => {
  storage.set('compud.cart.v1', JSON.stringify([machine]));
  assert.deepEqual(readCart(), []);
  storage.set('compud.cart.v2', JSON.stringify([{ ...machine, rentalMonths: 18 }]));
  assert.deepEqual(readCart(), []);
});
