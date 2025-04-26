"use client";

import { useCart } from "@/components/cart/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();

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
    router.push(`/orders/${orderId}/pay`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">My Cart</h1>

        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row items-center justify-between p-6 space-y-4 md:space-y-0"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-gray-600">
                    ${Number(p.price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={p.qty}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(p.id, +e.target.value)
                  }
                  className="w-20 text-center border border-gray-300 rounded focus:ring-2 focus:ring-orange-300"
                />
                <button
                  onClick={() => removeItem(p.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-gray-800 font-semibold">
                ${(Number(p.price) * p.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 transition"
          >
            Clear Cart
          </button>

          <div className="text-xl font-semibold text-gray-800">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-[#FF4500] text-white px-6 py-3 rounded hover:bg-[#e03f00] transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
