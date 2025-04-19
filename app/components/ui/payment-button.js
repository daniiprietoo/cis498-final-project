"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentButton({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status !== "PENDING") return null;

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch(`/api/orders/${orderId}/pay`, { method: "POST" });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert(data.message);
      setStatus(data.paymentStatus);
      router.push(`/user/orders`); // re‑fetch the page data if you want
    } else {
      console.error("Payment error:", data.error);
      alert(data.error);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center"
    >
      {loading ? "Processing…" : "Pay Now"}
    </button>
  );
}
