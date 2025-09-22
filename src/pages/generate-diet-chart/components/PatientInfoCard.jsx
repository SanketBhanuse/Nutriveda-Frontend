import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientInfoCard = ({ patient }) => {
  const getConstitutionColor = (constitution) => {
    switch (constitution?.toLowerCase()) {
      case 'vata': return 'text-blue-600 bg-blue-50';
      case 'pitta': return 'text-red-600 bg-red-50';
      case 'kapha': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{patient?.name}</h2>
            <p className="text-muted-foreground">Patient ID: {patient?.id}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="text-sm font-medium text-foreground">{patient?.lastUpdated}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Age</p>
          <p className="text-lg font-semibold text-foreground">{patient?.age} years</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Gender</p>
          <p className="text-lg font-semibold text-foreground capitalize">{patient?.gender}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Constitution</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getConstitutionColor(patient?.constitution)}`}>
            {patient?.constitution}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">BMI</p>
          <p className="text-lg font-semibold text-foreground">{patient?.bmi}</p>
        </div>
      </div>
      {patient?.conditions && patient?.conditions?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Medical Conditions</p>
          <div className="flex flex-wrap gap-2">
            {patient?.conditions?.map((condition, index) => (
              <span 
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(condition?.severity)}`}
              >
                {condition?.name}
                {condition?.severity && (
                  <span className="ml-1 text-xs">({condition?.severity})</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      {patient?.allergies && patient?.allergies?.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground mb-2">Allergies & Restrictions</p>
          <div className="flex flex-wrap gap-2">
            {patient?.allergies?.map((allergy, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-50"
              >
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInfoCard;