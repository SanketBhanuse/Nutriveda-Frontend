import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
          <Icon name="Leaf" size={32} color="white" />
        </div>
      </div>

      {/* App Name and Tagline */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">NutriVeda</h1>
        <p className="text-muted-foreground text-lg">
          Ayurvedic Diet Management System
        </p>
      </div>

      {/* Welcome Message */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to access your personalized Ayurvedic nutrition dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;