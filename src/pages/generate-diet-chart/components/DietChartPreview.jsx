import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DietChartPreview = ({ selectedMeals, patientName, onSave, onAssign, onGenerateAuto }) => {
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

  const getAyurvedicIcon = (property) => {
    switch (property) {
      case 'hot': return '🌶';
      case 'cold': return '❄';
      case 'sour': return '🍋';
      case 'sweet': return '🍯';
      case 'bitter': return '🌿';
      case 'astringent': return '🌰';
      default: return '⚖';
    }
  };

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case 'breakfast': return 'Coffee';
      case 'lunch': return 'UtensilsCrossed';
      case 'dinner': return 'Moon';
      case 'snacks': return 'Apple';
      default: return 'Utensils';
    }
  };

  const getTotalItems = () => {
    return Object.values(selectedMeals)?.reduce((total, mealFoods) => total + mealFoods?.length, 0);
  };

  const getTotalCalories = () => {
    let total = 0;
    Object.values(selectedMeals)?.forEach(mealFoods => {
      mealFoods?.forEach(food => {
        total += (food?.calories || 0) * (food?.quantity || 1);
      });
    });
    return Math.round(total);
  };

  const hasAnyMeals = getTotalItems() > 0;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Diet Chart Preview</h3>
              <p className="text-sm text-muted-foreground">
                {patientName} • {getTotalItems()} items • {getTotalCalories()} calories
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onGenerateAuto}
              iconName="Zap"
              iconPosition="left"
              iconSize={16}
            >
              Auto Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {!hasAnyMeals ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FileText" size={32} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">No meals planned yet</h4>
            <p className="text-muted-foreground mb-6">
              Start by adding foods to different meal categories or use auto-generate for quick recommendations.
            </p>
            <Button
              variant="default"
              onClick={onGenerateAuto}
              iconName="Zap"
              iconPosition="left"
            >
              Generate Automatic Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {mealTypes?.map((mealType) => {
              const mealFoods = selectedMeals?.[mealType] || [];
              if (mealFoods?.length === 0) return null;

              return (
                <div key={mealType} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name={getMealIcon(mealType)} size={18} className="text-primary" />
                    <h4 className="text-lg font-semibold text-foreground capitalize">{mealType}</h4>
                    <span className="text-sm text-muted-foreground">({mealFoods?.length} items)</span>
                  </div>
                  <div className="space-y-2">
                    {mealFoods?.map((food, index) => (
                      <div key={`${food?.id}-${index}`} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getAyurvedicIcon(food?.ayurvedicProperty)}</span>
                          <div>
                            <p className="font-medium text-foreground">{food?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {food?.calories} cal • {food?.protein}g protein
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">Qty: {food?.quantity || 1}</p>
                          <p className="text-xs text-muted-foreground">{food?.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Preparation Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Clock" size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Preparation Guidelines</p>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Follow traditional Ayurvedic cooking methods</li>
                    <li>• Use fresh, seasonal ingredients when possible</li>
                    <li>• Maintain proper meal timing as per patient's constitution</li>
                    <li>• Adjust portions based on patient's digestive capacity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={onSave}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Save as Draft
              </Button>
              <Button
                variant="default"
                onClick={onAssign}
                iconName="Send"
                iconPosition="left"
                className="flex-1"
              >
                Assign to Patient
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietChartPreview;