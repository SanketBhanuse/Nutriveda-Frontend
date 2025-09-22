import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'consultation': 'Calendar',
      'diet_chart': 'FileText',
      'patient_added': 'UserPlus',
      'treatment_updated': 'Activity'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'consultation': 'text-blue-600 bg-blue-100',
      'diet_chart': 'text-green-600 bg-green-100',
      'patient_added': 'text-purple-600 bg-purple-100',
      'treatment_updated': 'text-orange-600 bg-orange-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date?.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Clock" size={24} className="mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{activity?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-muted-foreground">{formatTime(activity?.timestamp)}</span>
                  {activity?.patientName && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-primary font-medium">{activity?.patientName}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;