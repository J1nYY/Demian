import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8001/cart/items", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setCart(data.results);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (id) => {
    try {
      const res = await fetch(`http://localhost:8001/cart/item/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "에러 발생");
      }
      await fetchCart()
      return data.message || "";
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`http://localhost:8001/cart/item/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        await fetchCart()
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart(); // 초기 로딩 시
  }, []);

  return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
        {children}
      </CartContext.Provider>
  );
}
