import { useEffect, useState } from 'react';
import { cartCount, readCart, subscribe } from '../lib/cart';

/** Item count next to the cart icon. Renders 0 until hydration reads storage. */
export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartCount(readCart()));
    return subscribe((items) => setCount(cartCount(items)));
  }, []);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', minWidth: '1ch' }}>{count}</span>
  );
}
