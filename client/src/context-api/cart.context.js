import React, { createContext, useState } from 'react';

export const CartStore = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartStore.Provider value={{ cart, setCart }}>
      {children}
    </CartStore.Provider>
  );
}
