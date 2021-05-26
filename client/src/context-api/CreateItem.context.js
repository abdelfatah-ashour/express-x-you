import React, { createContext, useState } from 'react';

export const CreateItemStore = createContext();

export function CreateItemProvider({ children }) {
  const [CreateItem, setCreateItem] = useState({
    nameItem: '',
    category: '',
    section: '',
    brand: '',
    details: '',
    qty: '',
    description: '',
    price: '',
    color: '',
    fileItem: '',
  });
  return (
    <CreateItemStore.Provider value={{ CreateItem, setCreateItem }}>
      {children}
    </CreateItemStore.Provider>
  );
}
