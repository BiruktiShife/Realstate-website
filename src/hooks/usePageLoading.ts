"use client";

import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

interface UsePageLoadingOptions {
  message?: string;
  delay?: number; // Minimum loading time in ms
}

export function usePageLoading(
  isLoading: boolean,
  options: UsePageLoadingOptions = {}
) {
  const { showLoading, hideLoading } = useLoading();
  const { message = 'Loading...', delay = 0 } = options;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      showLoading(message);
    } else if (delay > 0) {
      // Add minimum loading time for better UX
      timeoutId = setTimeout(() => {
        hideLoading();
      }, delay);
    } else {
      hideLoading();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      hideLoading();
    };
  }, [isLoading, message, delay, showLoading, hideLoading]);
}

// Hook for form submissions
export function useFormLoading() {
  const { showLoading, hideLoading } = useLoading();

  const submitWithLoading = async <T,>(
    submitFn: () => Promise<T>,
    loadingMessage = 'Submitting...'
  ): Promise<T> => {
    try {
      showLoading(loadingMessage);
      const result = await submitFn();
      return result;
    } finally {
      hideLoading();
    }
  };

  return { submitWithLoading };
}

// Hook for navigation loading
export function useNavigationLoading() {
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = (
    navigationFn: () => void,
    loadingMessage = 'Navigating...'
  ) => {
    showLoading(loadingMessage);
    // Hide loading after a short delay to allow navigation to complete
    setTimeout(() => {
      navigationFn();
      setTimeout(hideLoading, 500);
    }, 100);
  };

  return { navigateWithLoading };
}
