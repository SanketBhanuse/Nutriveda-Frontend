import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Browse Recipes",
      description: "Explore Ayurvedic recipes",
      icon: "ChefHat",
      path: "/recipe-details",
      color: "primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Track Water",
      description: "Log your daily hydration",
      icon: "Droplets",
      action: "trackWater",
      color: "blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Meal Reminder",
      description: "Set eating reminders",
      icon: "Bell",
      action: "setReminder",
      color: "warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Progress Report",
      description: "View weekly summary",
      icon: "TrendingUp",
      action: "viewProgress",
      color: "success",
      bgColor: "bg-success/10"
    }
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'trackWater': console.log('Opening water tracking modal');
        break;
      case 'setReminder': console.log('Opening reminder settings');
        break;
      case 'viewProgress': console.log('Opening progress report');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Shortcuts to common tasks</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <div key={index}>
            {action?.path ? (
              <Link
                to={action?.path}
                className={`block p-4 rounded-lg border border-border hover:border-${action?.color}/50 transition-smooth ${action?.bgColor} group`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <Icon name={action?.icon} size={20} className={`text-${action?.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                      {action?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleQuickAction(action?.action)}
                className={`w-full p-4 rounded-lg border border-border hover:border-${action?.color}/50 transition-smooth ${action?.bgColor} group text-left`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <Icon name={action?.icon} size={20} className={`text-${action?.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                      {action?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Today's Tips */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Today's Tip</h4>
            <p className="text-sm text-muted-foreground">
              Drink warm water with lemon first thing in the morning to kickstart your digestion 
              and balance your Agni (digestive fire) according to Ayurvedic principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;