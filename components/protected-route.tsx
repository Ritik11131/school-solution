"use client"
import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    // Get the access token from localStorage or cookies
    const accessToken = localStorage.getItem('access_token');

    // Check if the token exists and is valid (you can add your custom validation logic here)
    if (!accessToken) {
      setIsAuthenticated(false);
      router.push('/auth/login'); // Redirect to login page if not authenticated
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [router]);

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
