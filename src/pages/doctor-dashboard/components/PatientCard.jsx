import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientCard = ({ patient, onViewProfile, onGenerateDietChart }) => {
  const getConditionColor = (condition) => {
    const colors = {
      'Diabetes': 'bg-red-100 text-red-800',
      'Hypertension': 'bg-orange-100 text-orange-800',
      'Obesity': 'bg-yellow-100 text-yellow-800',
      'Digestive Issues': 'bg-green-100 text-green-800',
      'Arthritis': 'bg-blue-100 text-blue-800',
      'Stress': 'bg-purple-100 text-purple-800'
    };
    return colors?.[condition] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{patient?.name}</h3>
            <p className="text-muted-foreground text-sm">Age: {patient?.age} years</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(patient?.condition)}`}>
            {patient?.condition}
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Last Consultation: {formatDate(patient?.lastConsultation)}</span>
          <span className="text-xs bg-muted px-2 py-1 rounded">
            {getDaysAgo(patient?.lastConsultation)} days ago
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Phone" size={16} />
          <span>{patient?.phone}</span>
        </div>

        {patient?.currentTreatment && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Activity" size={16} />
            <span>Current Treatment: {patient?.currentTreatment}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${patient?.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className="text-muted-foreground">{patient?.status}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(patient)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onGenerateDietChart(patient)}
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
          >
            Diet Chart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;