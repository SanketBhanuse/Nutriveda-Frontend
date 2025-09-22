import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthenticationGuard = ({ 
  children, 
  isAuthenticated = false, 
  userRole = null,
  requiredRole = null 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate('/authentication-login', { 
          state: { from: location?.pathname },
          replace: true 
        });
        return;
      }

      // If authenticated but wrong role, redirect to appropriate dashboard
      if (requiredRole && userRole !== requiredRole) {
        const redirectPath = userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
        navigate(redirectPath, { replace: true });
        return;
      }

      // Role-based route validation
      const doctorOnlyRoutes = ['/doctor-dashboard', '/add-new-patient', '/generate-diet-chart'];
      const patientOnlyRoutes = ['/patient-dashboard'];
      
      if (userRole === 'patient' && doctorOnlyRoutes?.includes(location?.pathname)) {
        navigate('/patient-dashboard', { replace: true });
        return;
      }

      if (userRole === 'doctor' && patientOnlyRoutes?.includes(location?.pathname)) {
        navigate('/doctor-dashboard', { replace: true });
        return;
      }

      setIsChecking(false);
    };

    checkAuthentication();
  }, [isAuthenticated, userRole, requiredRole, navigate, location?.pathname]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default AuthenticationGuard;