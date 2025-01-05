import { useState, useCallback } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { apiClient } from '../lib/axios-instance';
import toast from 'react-hot-toast';

interface UseApiClientOptions {
  showToast?: boolean;
}

interface ToastMessages {
  loading?: string;
  success?: string;
  error?: string;
}

export const useApiClient = <T = any>(options: UseApiClientOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(async <R = T>(
    config: AxiosRequestConfig,
    toastMessages?: ToastMessages
  ): Promise<R> => {
    setIsLoading(true);
    setError(null);

    const promise = apiClient(config)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        setError(error as Error);
        throw error;
      })
      .finally(() => setIsLoading(false));

    if (options.showToast && toastMessages) {
      return toast.promise(promise, {
        loading: toastMessages.loading || 'Loading...',
        success: toastMessages.success || 'Success!',
        error: (err) => toastMessages.error || err.message || 'An error occurred',
      });
    }

    return promise;
  }, [options.showToast]);

  return {
    isLoading,
    error,
    request,
  };
};