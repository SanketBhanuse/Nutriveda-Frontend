import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import RoleSelector from './components/RoleSelector';
import DemoCredentials from './components/DemoCredentials';

const AuthenticationLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for validation
  const validCredentials = [
    {
      email: 'dr.sharma@nutriveda.com',
      password: 'doctor123',
      role: 'doctor',
      name: 'Dr. Priya Sharma'
    },
    {
      email: 'patient@nutriveda.com',
      password: 'patient123',
      role: 'patient',
      name: 'Rahul Patel'
    }
  ];

  useEffect(() => {
    // Clear any existing authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  }, []);

  const handleLogin = async (formData) => {
    if (!selectedRole) {
      setError('Please select your role before signing in');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find matching credentials
      const validUser = validCredentials?.find(
        user => user?.email === formData?.email && 
                user?.password === formData?.password &&
                user?.role === selectedRole
      );

      if (!validUser) {
        throw new Error('Invalid credentials or role mismatch. Please check your email, password, and selected role.');
      }

      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', validUser?.role);
      localStorage.setItem('userName', validUser?.name);

      // Navigate to appropriate dashboard
      const redirectPath = location?.state?.from || 
        (validUser?.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      
      navigate(redirectPath, { replace: true });

    } catch (err) {
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleFillCredentials = (account) => {
    setSelectedRole(account?.role);
    // This would typically fill the form, but since we're using controlled components // we'll need to trigger the form fill through a different mechanism
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (emailInput && passwordInput) {
      emailInput.value = account?.email;
      passwordInput.value = account?.password;
      
      // Trigger change events
      emailInput?.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput?.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
          <LoginHeader />
          
          <div className="space-y-8">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
              isLoading={isLoading}
            />

            <LoginForm
              onLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />

            <DemoCredentials onFillCredentials={handleFillCredentials} />
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} NutriVeda. Secure Ayurvedic Healthcare Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLogin;