// hooks/useCrew.ts
import { useCallback } from 'react';
import { useApiClient } from './useApiClient'; // Adjust the import path as necessary
import { CrewResponse } from '@/interface/crew';

export const useCrew = () => {
  const { isLoading, request } = useApiClient<CrewResponse>({ showToast: true });

  const fetchCrews = useCallback(async () => {
    const response = await request({
      method: 'GET',
      url: '/crew/list',
    });
    return response;
  }, [request]);

  return {
    isLoading,
    fetchCrews,
  };
};