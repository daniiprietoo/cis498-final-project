"use client";
import { useCart } from "@/components/cart/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();

  console.log("Cart items:", items);

  const handlePlaceOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) {
      console.error("Failed to create order");
      return;
    }
    const { orderId } = await res.json();
    clearCart();
    router.push(`/orders/${orderId}`);
  };

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.name} ×
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
      <div className="space-x-2">
        <button onClick={clearCart} className="px-4 py-2 bg-gray-200 rounded">
          Clear Cart
        </button>
        <button
          onClick={handlePlaceOrder}
          className="px-4 py-2 bg-[#FF4500] text-white rounded hover:bg-[#e03f00]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
