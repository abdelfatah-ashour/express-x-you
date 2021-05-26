import React, { createContext, useState } from 'react';

export const AuthStore = createContext();

export function AuthProvider({ children }) {
  const [Auth, setAuth] = useState({
    isAuth: false,
    _id: false,
    username: false,
    email: false,
    role: false,
  });
  return (
    <AuthStore.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthStore.Provider>
  );
}
