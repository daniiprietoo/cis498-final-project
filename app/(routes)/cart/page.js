"use client";
import { useCart } from "@/components/cart/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.name} &times;
            <input
              type="number"
              value={p.qty}
              onChange={(e) => updateQuantity(p.id, +e.target.value)}
              min="1"
            />
            <button onClick={() => removeItem(p.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
