'use client'

import { createContext, useContext, useState } from 'react';

export const AdminContext = createContext({
  admin: null,
  setAdmin: () => {},
});

export function AdminProvider({ admin: initialAdmin, children }) {
  const [admin, setAdmin] = useState(initialAdmin);
  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be inside BusinessProvider");
  return context;
}

