import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Patients',
      value: metrics?.totalPatients,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Treatments',
      value: metrics?.activeTreatments,
      icon: 'Activity',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Consultations Today',
      value: metrics?.consultationsToday,
      icon: 'Calendar',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+3',
      changeType: 'positive'
    },
    {
      title: 'Diet Charts Generated',
      value: metrics?.dietChartsGenerated,
      icon: 'FileText',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={metric?.icon} size={20} className={metric?.color} />
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              metric?.changeType === 'positive' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
            }`}>
              {metric?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric?.value}</h3>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;