import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectIfAuth?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectIfAuth }) => {
  const { isAuthenticated, isLoadingUser } = useAuth();

  // Show loading while checking authentication
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Redirect to home page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect to specified path if authenticated and redirectIfAuth is provided
  if (isAuthenticated && redirectIfAuth) {
    return <Navigate to={redirectIfAuth} replace />;
  }

  // Render children if authenticated and no redirect is needed
  // or if not authenticated and redirectIfAuth is provided
  return <>{children}</>;
};

export default ProtectedRoute;