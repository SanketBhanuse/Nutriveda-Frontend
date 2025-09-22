import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IngredientsList = ({ ingredients, servings: defaultServings }) => {
  const [servings, setServings] = useState(defaultServings);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const adjustQuantity = (quantity, originalServings) => {
    const multiplier = servings / originalServings;
    const adjusted = quantity * multiplier;
    return adjusted % 1 === 0 ? adjusted?.toString() : adjusted?.toFixed(1);
  };

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev?.[index]
    }));
  };

  const getAyurvedicIcon = (property) => {
    const icons = {
      'hot': '🌶️',
      'cold': '❄️',
      'sour': '🍋',
      'sweet': '🍯',
      'bitter': '🌿',
      'pungent': '🔥',
      'astringent': '🌰'
    };
    return icons?.[property?.toLowerCase()] || '🌿';
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Ingredients</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Servings:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setServings(Math.max(1, servings - 1))}
              disabled={servings <= 1}
              iconName="Minus"
              iconSize={16}
            />
            <span className="w-8 text-center font-medium">{servings}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setServings(servings + 1)}
              iconName="Plus"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {ingredients?.map((ingredient, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth cursor-pointer ${
              checkedIngredients?.[index]
                ? 'bg-muted border-primary/20 text-muted-foreground line-through'
                : 'bg-background border-border hover:border-primary/30'
            }`}
            onClick={() => toggleIngredient(index)}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
              checkedIngredients?.[index]
                ? 'bg-primary border-primary' :'border-border'
            }`}>
              {checkedIngredients?.[index] && (
                <Icon name="Check" size={12} color="white" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {adjustQuantity(ingredient?.quantity, defaultServings)} {ingredient?.unit} {ingredient?.name}
                </span>
                <div className="flex items-center space-x-2">
                  {ingredient?.ayurvedicProperties?.map((property, propIndex) => (
                    <span
                      key={propIndex}
                      className="text-lg"
                      title={property}
                    >
                      {getAyurvedicIcon(property)}
                    </span>
                  ))}
                </div>
              </div>
              {ingredient?.substitution && (
                <p className="text-sm text-muted-foreground mt-1">
                  Alternative: {ingredient?.substitution}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <Icon name="Info" size={14} className="inline mr-1" />
          Tap ingredients to check them off as you prepare the recipe
        </p>
      </div>
    </div>
  );
};

export default IngredientsList;