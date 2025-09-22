import React from 'react';

import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleSelect, isLoading }) => {
  const roles = [
    {
      id: 'doctor',
      label: 'Doctor',
      description: 'Healthcare professional managing patients',
      icon: 'Stethoscope',
      color: 'primary'
    },
    {
      id: 'patient',
      label: 'Patient',
      description: 'Individual following dietary guidance',
      icon: 'User',
      color: 'secondary'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Select Your Role</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you'll be using NutriVeda
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles?.map((role) => (
          <button
            key={role?.id}
            type="button"
            onClick={() => onRoleSelect(role?.id)}
            disabled={isLoading}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left group ${
              selectedRole === role?.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedRole === role?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
              } transition-colors`}>
                <Icon name={role?.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${
                  selectedRole === role?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {role?.label}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {role?.description}
                </p>
              </div>
            </div>

            {selectedRole === role?.id && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-primary-foreground" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      {!selectedRole && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Please select your role to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;