import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSave, 
  onCancel, 
  isLoading, 
  isSaveDisabled, 
  hasUnsavedChanges,
  lastSaved 
}) => {
  const formatLastSaved = (timestamp) => {
    if (!timestamp) return null;
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Saved just now';
    if (diffInMinutes === 1) return 'Saved 1 minute ago';
    if (diffInMinutes < 60) return `Saved ${diffInMinutes} minutes ago`;
    
    return saved?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm font-medium">Unsaved changes</span>
            </div>
          )}
          
          {lastSaved && !hasUnsavedChanges && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm text-muted-foreground">
                {formatLastSaved(lastSaved)}
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          
          <Button
            variant="default"
            onClick={onSave}
            loading={isLoading}
            disabled={isSaveDisabled}
            iconName="UserPlus"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            {isLoading ? 'Saving Patient...' : 'Save Patient'}
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• All required fields must be completed before saving</p>
        <p>• Patient data is automatically saved every 30 seconds</p>
        <p>• You can generate diet charts immediately after saving</p>
      </div>
    </div>
  );
};

export default FormActions;