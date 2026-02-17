"use client";

import React, { createContext, useContext, useState } from "react";

const SumContext = createContext(null);

export function SumProvider({ children }) {
  const [result, setResult] = useState(0);

  const add = (amount = 2) => setResult((prev) => prev + amount);
  const subtract = (amount = 2) => setResult((prev) => prev - amount);

  return (
    <SumContext.Provider value={{ result, add, subtract }}>
      {children}
    </SumContext.Provider>
  );
}

export function useSum() {
  const ctx = useContext(SumContext);
  if (!ctx) throw new Error("useSum must be used within SumProvider");
  return ctx;
}
