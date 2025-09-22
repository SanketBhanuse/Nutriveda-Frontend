import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthBenefits = ({ benefits, contraindications, seasonalRecommendations }) => {
  const getBenefitIcon = (category) => {
    const icons = {
      'digestive': 'Zap',
      'immunity': 'Shield',
      'cardiovascular': 'Heart',
      'metabolic': 'Activity',
      'respiratory': 'Wind',
      'mental': 'Brain',
      'skin': 'Sparkles',
      'detox': 'Droplets'
    };
    return icons?.[category] || 'Plus';
  };

  const getSeasonIcon = (season) => {
    const icons = {
      'spring': 'Flower',
      'summer': 'Sun',
      'monsoon': 'CloudRain',
      'autumn': 'Leaf',
      'winter': 'Snowflake'
    };
    return icons?.[season?.toLowerCase()] || 'Calendar';
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Health Benefits & Recommendations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Heart" size={18} className="text-success mr-2" />
            Health Benefits
          </h3>
          <div className="space-y-3">
            {benefits?.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getBenefitIcon(benefit?.category)} size={16} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground capitalize">{benefit?.category}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{benefit?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="AlertTriangle" size={18} className="text-warning mr-2" />
            Contraindications
          </h3>
          <div className="space-y-3">
            {contraindications?.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
                <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">{item?.condition}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item?.reason}</p>
                  {item?.alternative && (
                    <p className="text-sm text-accent mt-1">
                      <strong>Alternative:</strong> {item?.alternative}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={18} className="text-primary mr-2" />
          Seasonal Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seasonalRecommendations?.map((season, index) => (
            <div key={index} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={getSeasonIcon(season?.season)} size={18} className="text-primary" />
                <h4 className="font-medium text-foreground capitalize">{season?.season}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{season?.recommendation}</p>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-primary font-medium">Best time:</span>
                <span className="text-xs text-muted-foreground">{season?.bestTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Important Note</h4>
            <p className="text-sm text-muted-foreground">
              These recommendations are based on traditional Ayurvedic principles. Please consult with a qualified Ayurvedic practitioner or healthcare provider before making significant dietary changes, especially if you have existing health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBenefits;