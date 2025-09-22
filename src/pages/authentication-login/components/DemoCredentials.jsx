import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DemoCredentials = ({ onFillCredentials }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoAccounts = [
    {
      role: 'doctor',
      email: 'dr.sharma@nutriveda.com',
      password: 'doctor123',
      name: 'Dr. Priya Sharma'
    },
    {
      role: 'patient',
      email: 'patient@nutriveda.com',
      password: 'patient123',
      name: 'Rahul Patel'
    }
  ];

  const handleFillCredentials = (account) => {
    onFillCredentials(account);
    setIsExpanded(false);
  };

  return (
    <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Demo Accounts</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            Use these demo credentials to explore the application:
          </p>
          
          {demoAccounts?.map((account) => (
            <div key={account?.role} className="p-3 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={account?.role === 'doctor' ? 'Stethoscope' : 'User'} 
                    size={14} 
                    className="text-primary" 
                  />
                  <span className="text-sm font-medium capitalize">{account?.role}</span>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleFillCredentials(account)}
                  iconName="Copy"
                  iconPosition="left"
                >
                  Use
                </Button>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-mono">{account?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <span className="font-mono">{account?.password}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;