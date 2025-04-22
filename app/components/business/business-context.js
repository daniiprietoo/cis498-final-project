'use client'

import { createContext, useContext, useState } from 'react';

export const BusinessContext = createContext({
  business: null,
  setBusiness: () => {},
});

export function BusinessProvider({ business: initialBusiness, children }) {
  const [business, setBusiness] = useState(initialBusiness);
  return (
    <BusinessContext.Provider value={{ business, setBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be inside BusinessProvider");
  return context;
}

