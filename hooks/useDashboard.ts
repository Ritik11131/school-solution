// hooks/useCrew.ts
import { useCallback } from 'react';
import { useApiClient } from './useApiClient';

export const useDashboard = () => {
  const { isLoading, request } = useApiClient<any>({ showToast: true });

  const fetchVehicleList = useCallback(async () => {
    const response = await request({
      method: 'GET',
      url: 'dashboard/vehicles/list',
    });
    return response;
  }, [request]);

  return {
    isLoading,
    fetchVehicleList
  };
};