"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GlobalLoading } from '@/components/GlobalLoading';

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  const showLoading = useCallback((newMessage?: string) => {
    if (newMessage) {
      setMessage(newMessage);
    }
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  const value = {
    isLoading,
    message,
    showLoading,
    hideLoading,
    setLoadingMessage,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <GlobalLoading isLoading={isLoading} message={message} />
    </LoadingContext.Provider>
  );
}

// Hook for automatic loading on async operations
export function useAsyncLoading() {
  const { showLoading, hideLoading, setLoadingMessage } = useLoading();

  const executeWithLoading = useCallback(
    async <T,>(
      asyncFn: () => Promise<T>,
      loadingMessage?: string
    ): Promise<T> => {
      try {
        showLoading(loadingMessage);
        const result = await asyncFn();
        return result;
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  return { executeWithLoading, setLoadingMessage };
}
