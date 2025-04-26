"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((curr) => {
      const exists = curr.find((p) => p.id === product.id);
      if (exists) {
        return curr.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...curr, { ...product, qty }];
    });
  }

  function removeItem(productId) {
    setItems((curr) => curr.filter((p) => p.id !== productId));
  }

  function updateQuantity(productId, qty) {
    setItems((curr) =>
      curr.map((p) => (p.id === productId ? { ...p, qty } : p))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <CartProvider>");
  return ctx;
}
