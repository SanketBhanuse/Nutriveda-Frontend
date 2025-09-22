import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MealPlanningSection = ({ 
  mealType, 
  icon, 
  foods, 
  selectedFoods, 
  onFoodSelect, 
  onFoodRemove,
  recommendations 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

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

  const filteredFoods = foods?.filter(food =>
    food?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    food?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const isSelected = (foodId) => selectedFoods?.some(food => food?.id === foodId);

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{mealType}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedFoods?.length} items selected
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Search */}
          <Input
            type="search"
            placeholder={`Search ${mealType?.toLowerCase()} foods...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />

          {/* Recommendations */}
          {recommendations && recommendations?.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Recommended for this patient</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendations?.map((food) => (
                  <button
                    key={food?.id}
                    onClick={() => onFoodSelect(food)}
                    disabled={isSelected(food?.id)}
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-smooth ${
                      isSelected(food?.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    <span>{getAyurvedicIcon(food?.ayurvedicProperty)}</span>
                    <span>{food?.name}</span>
                    {!isSelected(food?.id) && <Icon name="Plus" size={12} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Foods */}
          {selectedFoods?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Selected Items</h4>
              <div className="space-y-2">
                {selectedFoods?.map((food) => (
                  <div key={food?.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getAyurvedicIcon(food?.ayurvedicProperty)}</span>
                      <div>
                        <p className="font-medium text-foreground">{food?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {food?.calories} cal • {food?.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        defaultValue={food?.quantity || 1}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onFoodRemove(food?.id)}
                        iconName="X"
                        iconSize={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Foods */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Available Foods</h4>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredFoods?.map((food) => (
                <div 
                  key={food?.id} 
                  className={`flex items-center justify-between p-3 border rounded-lg transition-smooth ${
                    isSelected(food?.id)
                      ? 'border-primary/20 bg-primary/5' :'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getAyurvedicIcon(food?.ayurvedicProperty)}</span>
                    <div>
                      <p className="font-medium text-foreground">{food?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {food?.calories} cal • {food?.protein}g protein • {food?.category}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isSelected(food?.id) ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => isSelected(food?.id) ? onFoodRemove(food?.id) : onFoodSelect(food)}
                    iconName={isSelected(food?.id) ? "Check" : "Plus"}
                    iconSize={16}
                    disabled={isSelected(food?.id)}
                  >
                    {isSelected(food?.id) ? 'Added' : 'Add'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanningSection;