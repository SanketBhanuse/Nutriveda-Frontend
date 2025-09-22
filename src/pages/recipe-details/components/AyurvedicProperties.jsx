import React from 'react';
import Icon from '../../../components/AppIcon';

const AyurvedicProperties = ({ properties }) => {
  const getPropertyIcon = (property) => {
    const icons = {
      'digestibility': 'Zap',
      'potency': 'Flame',
      'post-digestive': 'RefreshCw',
      'dosha-effect': 'Yin-yang'
    };
    return icons?.[property] || 'Info';
  };

  const getPropertyColor = (value) => {
    const colors = {
      'easy': 'text-success',
      'moderate': 'text-warning',
      'difficult': 'text-error',
      'hot': 'text-error',
      'cold': 'text-blue-500',
      'neutral': 'text-muted-foreground',
      'sweet': 'text-amber-500',
      'sour': 'text-yellow-500',
      'pungent': 'text-red-500'
    };
    return colors?.[value?.toLowerCase()] || 'text-foreground';
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Ayurvedic Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getPropertyIcon('digestibility')} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Digestibility (Agni)</h3>
              <p className={`text-sm font-medium ${getPropertyColor(properties?.digestibility?.level)}`}>
                {properties?.digestibility?.level}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {properties?.digestibility?.description}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getPropertyIcon('potency')} size={20} className="text-error" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Potency (Virya)</h3>
              <p className={`text-sm font-medium ${getPropertyColor(properties?.potency?.type)}`}>
                {properties?.potency?.type}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {properties?.potency?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getPropertyIcon('post-digestive')} size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Post-Digestive Effect (Vipaka)</h3>
              <p className={`text-sm font-medium ${getPropertyColor(properties?.vipaka?.taste)}`}>
                {properties?.vipaka?.taste}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {properties?.vipaka?.description}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getPropertyIcon('dosha-effect')} size={20} className="text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Dosha Effects</h3>
              <div className="space-y-1">
                {Object.entries(properties?.doshaEffects)?.map(([dosha, effect]) => (
                  <div key={dosha} className="flex items-center justify-between text-sm">
                    <span className="capitalize font-medium">{dosha}:</span>
                    <span className={`${effect === 'increases' ? 'text-error' : effect === 'decreases' ? 'text-success' : 'text-muted-foreground'}`}>
                      {effect === 'increases' ? '↑' : effect === 'decreases' ? '↓' : '→'} {effect}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Traditional Understanding</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {properties?.traditionalNote}
        </p>
      </div>
    </div>
  );
};

export default AyurvedicProperties;