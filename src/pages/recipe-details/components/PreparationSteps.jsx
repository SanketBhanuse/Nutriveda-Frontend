import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PreparationSteps = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev?.[index]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Preparation Instructions</h2>
      <div className="space-y-4">
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`flex space-x-4 p-4 rounded-lg border transition-smooth cursor-pointer ${
              completedSteps?.[index]
                ? 'bg-muted border-primary/20' :'bg-background border-border hover:border-primary/30'
            }`}
            onClick={() => toggleStep(index)}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium transition-smooth ${
              completedSteps?.[index]
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-border text-muted-foreground'
            }`}>
              {completedSteps?.[index] ? (
                <Icon name="Check" size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            
            <div className="flex-1">
              <p className={`text-foreground leading-relaxed ${
                completedSteps?.[index] ? 'line-through text-muted-foreground' : ''
              }`}>
                {step?.instruction}
              </p>
              {step?.tip && (
                <div className="mt-2 p-2 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    <Icon name="Lightbulb" size={14} className="inline mr-1" />
                    <strong>Tip:</strong> {step?.tip}
                  </p>
                </div>
              )}
              {step?.timing && (
                <p className="text-sm text-muted-foreground mt-1">
                  <Icon name="Clock" size={14} className="inline mr-1" />
                  {step?.timing}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-success/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            {Object.keys(completedSteps)?.filter(key => completedSteps?.[key])?.length} of {steps?.length} steps completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreparationSteps;