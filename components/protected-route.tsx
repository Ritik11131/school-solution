"use client"

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner } from '@nextui-org/spinner'; // Assuming you are using next-ui

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Get the access token from localStorage or cookies
      const accessToken = localStorage.getItem('access_token');

      // Placeholder for token validation logic
      const isValidToken = accessToken ? true : false; // Replace with actual validation logic

      if (!isValidToken) {
        setIsAuthenticated(false);
        if (!pathname.startsWith('/auth')) {
          router.replace('/auth/login'); // Redirect to login page if not authenticated
        }
      } else {
        setIsAuthenticated(true);
        if (pathname.startsWith('/auth')) {
          router.replace('/main/dashboard'); // Redirect to main page if authenticated
        }
      }
      setIsLoading(false); // Set loading to false after authentication check
    };
    
    checkAuthentication();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated && pathname.startsWith('/auth')) {
    return null; // Prevent rendering the auth pages if authenticated
  }

  return <>{isAuthenticated || pathname.startsWith('/auth') ? children : null}</>;
};

export default ProtectedRoute;
