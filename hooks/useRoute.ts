// hooks/useParents.ts
import { useCallback } from 'react';
import { useApiClient } from './useApiClient'; // Adjust the import path as necessary

export const useRoute = () => {
  const { isLoading, request } = useApiClient<any>({ showToast: true });

  const fetchAllRoutes = useCallback(async () => {
    const response = await request({
      method: 'GET',
      url: '/routes/list',
    });
    return response;
  }, [request]);

  const fetchSelectedRoutes = useCallback(async (route:any) => {
    const response = await request({
      method: 'GET',
      url: `/routes/detail/${route?.id}`,
    });
    return response;
  }, [request]);


  const createRoute = useCallback(async (data: any) => {
    const response = await request(
    {
      method: 'POST',
      url: '/parents/create',
      data,
    },
       {
        loading: 'Creating Parent...',
        success: 'Parent Created successfully!',
        error: 'Creation Failed',
      }
  );
    return response;
  },[request]);

  return {
    isLoading,
    fetchAllRoutes,
    createRoute,
    fetchSelectedRoutes
  };
};