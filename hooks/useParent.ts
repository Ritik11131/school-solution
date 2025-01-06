import { useCallback } from "react";
import { useApiClient } from "./useApiClient";

interface ParentResponse {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
  }

export const useParents = () => {

    const { isLoading,request } = useApiClient<ParentResponse>({ showToast: true });

    const fetchParents = useCallback(async () => {

        const response = await request(
          {
            method: 'GET',
            url: '/parents/list',
          },
        );
        
        return response;
      }, [request]);

      return {
       isLoading,
       fetchParents
      };

}