import { useState, useCallback } from 'react';
import { useApiClient } from './useApiClient';
import { useRouter  } from "next/navigation";
import environment from '@/environment';


interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    !!localStorage.getItem('access_token')
  );
  const router = useRouter();
  const { request } = useApiClient<AuthResponse>({ showToast: true, clientType: 'auth' });

  const login = useCallback(async (username: string, password: string) => {
    console.log(process.env.NODE_ENV);
    
    const data = new URLSearchParams({
      audience: 'web',
      grantType: "PASSWORD",
      clientId: environment.CLIENT_ID,
      clientSecret: environment.CLIENT_SECRET,
      username,
      password,
    });

    // const response = await request(
    //   {
    //     method: 'POST',
    //     url: 'oauth/token',
    //     data,
    //   },
    //   {
    //     loading: 'Logging in...',
    //     success: 'Logged in successfully!',
    //     error: 'Login failed. Please check your credentials.',
    //   }
    // );


    const response = {
          type: "Bearer",
          accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZHcithTHdrZHZIRUcvWU81N3cyeTFlaTYvby9RSC9HSllXRFQrVXdUTlE9In0.eyJzY2hvb2xJZCI6MSwiaXNTY2hvb2xBZG1pbiI6dHJ1ZSwiaXNDcmV3TWVtYmVyIjpmYWxzZSwiaXNQYXJlbnQiOmZhbHNlLCJzdWJUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYm1seGRXVmZibUZ0WlNJNklrRnVhV3dpTENKeWIyeGxJam9pTVNJc0luVnpaWEpmYVdRaU9pSTBPREkySWl3aWNHRnlaVzUwWDJsa0lqb2lNU0lzSW5ScGJXVmZlbTl1WlNJNklqQTFPak13SWl3aWJtSm1Jam94TnpNMk1UZzROakEwTENKbGVIQWlPakUzTXpZM09UTTBNRFFzSW1saGRDSTZNVGN6TmpFNE9EWXdOSDAub2llbTJkUVRiSi1JZVpfRmZnNjZaRENRUEkxMmRWOXZGdzM4aDVPRXRKbyIsImlhdCI6MTczNjE4ODYwNCwibmJmIjoxNzM2MTg4NjA0LCJleHAiOjE3MzY2MjA2MDR9.IsvE4EnPfjdq2MWhjSPQZch5A-SfTKsD_y_zpQ3HDm9lEE-eeT_K4MXmrqSpwWYxerIXF3KLDrkBfd7E_hWVvBC2Cf9lgI3bCBuQzBBDH4sT_jawf9DkojYL6KbE2pWzY435x6ZJrnGJub2V2sQKdOi19PU5Y23meEsZQQapb7U-c5pUAjRqiEgKJXAIstIhcZLYwmtyqSMZ29X9OMA2dEZyWJuWycFJXd9AeSE9fuYJ5ewnxa8Wclle-ojBu9OvdJ5BB2LP0b4ssQhWiFohr8NtvFgDys1NsMsFZV1YV-Q51DWCWG3E4BlZgNBcYfqPqUNM5r7kFBsmFpYk_B4ylQ",
          refreshToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZHcithTHdrZHZIRUcvWU81N3cyeTFlaTYvby9RSC9HSllXRFQrVXdUTlE9In0.eyJpYXQiOjE3MzYxODg2MDQsIm5iZiI6MTczNjE4ODYwNCwiZXhwIjoxNzM2MTk4Njg0fQ.Pl8keT-YpiPwmrEpGFQJljekmj3537tLAT9xEVDrqLF8Iu8LM7Dg8A_0_zmzqHJMjPpoqY2yl2eIRm1JLstahlj5s44o4jamo3qSi3cUNlzKXXB9qVEc6kZufFwqIEdkNZZO_TFaIrfmTCBVwb352Ni6ZsHh2noMo3DJF04mHGd6Vc4HK2h2IYoxvgBBPJ68fu7KIvZBwp0A-VgVUKuKxlT-9t_KMrZvEld2XSg7WNKkRXkLlyTgWwMuZhAp-R4mznWi5cEofzmkChVK3k8sGSeRGvPvsxuO4QkXEoQQwFY5QUoMBDCFtAeRBzPJXg9yxkBsD6ijit-ajdqQQU11Wg"
  }

    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    setIsAuthenticated(true);
    
    return response;
  }, [request]);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('hasVisited');
    setIsAuthenticated(false);
    router.push("/auth/login");
  }, [router]);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await request(
      {
        method: 'POST',
        url: 'oauth/token/refresh',
        data: { refresh_token: refreshToken },
      },
      {
        error: 'Failed to refresh token',
      }
    );

    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    
    return response;
  }, [request]);

  return {
    isAuthenticated,
    login,
    logout,
    refreshToken,
  };
};