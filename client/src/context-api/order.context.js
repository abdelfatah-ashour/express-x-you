import React, { createContext, useState } from 'react';

export const OrderStore = createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);

  return (
    <OrderStore.Provider value={{ order, setOrder }}>
      {children}
    </OrderStore.Provider>
  );
}
