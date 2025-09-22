import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, title: 'Personal Info', icon: 'User' },
    { id: 2, title: 'Medical History', icon: 'Heart' },
    { id: 3, title: 'Ayurvedic Assessment', icon: 'Leaf' }
  ];

  const getStepStatus = (stepId) => {
    if (completedSections?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return completedSections?.includes(stepId) ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth ${getStepClasses(getStepStatus(step?.id))}`}>
                {getStepStatus(step?.id) === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="text-center">
                <p className={`text-xs font-medium ${getStepStatus(step?.id) === 'current' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Step {step?.id}
                </p>
                <p className={`text-sm ${getStepStatus(step?.id) === 'current' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step?.title}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 transition-smooth ${getConnectorClasses(step?.id)}`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-smooth duration-300"
          style={{ width: `${(completedSections?.length / totalSteps) * 100}%` }}
        ></div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        {completedSections?.length} of {totalSteps} sections completed
      </p>
    </div>
  );
};

export default FormProgressIndicator;