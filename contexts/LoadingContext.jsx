'use client';
import { createContext, useContext } from 'react';
import { create } from 'zustand';

export const useLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  return (
    <LoadingContext.Provider value={useLoadingStore}>
      {children}
    </LoadingContext.Provider>
  );
}