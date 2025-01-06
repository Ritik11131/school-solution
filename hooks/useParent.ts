// hooks/useParents.ts
import { useCallback } from 'react';
import { useApiClient } from './useApiClient'; // Adjust the import path as necessary
import { ParentResponse } from '@/interface/parent'; // Adjust the import path as necessary

export const useParents = () => {
  const { isLoading, request } = useApiClient<ParentResponse>({ showToast: true });

  const fetchParents = useCallback(async () => {
    const response = await request({
      method: 'GET',
      url: '/parents/list',
    });
    return response;
  }, [request]);

  return {
    isLoading,
    fetchParents,
  };
};