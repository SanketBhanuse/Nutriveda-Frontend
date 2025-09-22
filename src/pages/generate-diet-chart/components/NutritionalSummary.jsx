import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const NutritionalSummary = ({ selectedMeals }) => {
  // Calculate total nutrition from all selected meals
  const calculateTotalNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;

    Object.values(selectedMeals)?.forEach(mealFoods => {
      mealFoods?.forEach(food => {
        const quantity = food?.quantity || 1;
        totalCalories += (food?.calories || 0) * quantity;
        totalProtein += (food?.protein || 0) * quantity;
        totalCarbs += (food?.carbs || 0) * quantity;
        totalFat += (food?.fat || 0) * quantity;
        totalFiber += (food?.fiber || 0) * quantity;
      });
    });

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat),
      fiber: Math.round(totalFiber)
    };
  };

  const nutrition = calculateTotalNutrition();

  // Data for pie chart
  const macroData = [
    { name: 'Protein', value: nutrition?.protein, color: '#22C55E' },
    { name: 'Carbs', value: nutrition?.carbs, color: '#3B82F6' },
    { name: 'Fat', value: nutrition?.fat, color: '#F59E0B' },
    { name: 'Fiber', value: nutrition?.fiber, color: '#8B5CF6' }
  ];

  // Calculate Ayurvedic balance
  const calculateAyurvedicBalance = () => {
    const properties = { hot: 0, cold: 0, sour: 0, sweet: 0, bitter: 0, astringent: 0 };
    
    Object.values(selectedMeals)?.forEach(mealFoods => {
      mealFoods?.forEach(food => {
        if (food?.ayurvedicProperty) {
          properties[food.ayurvedicProperty] = (properties?.[food?.ayurvedicProperty] || 0) + 1;
        }
      });
    });

    return properties;
  };

  const ayurvedicBalance = calculateAyurvedicBalance();

  const getPropertyIcon = (property) => {
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Nutritional Summary</h3>
      </div>
      {/* Total Calories */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{nutrition?.calories}</p>
          <p className="text-sm text-muted-foreground">Total Daily Calories</p>
        </div>
      </div>
      {/* Macronutrient Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-medium text-foreground mb-4">Macronutrient Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}g`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-foreground mb-4">Nutritional Details</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Protein</span>
              </div>
              <span className="text-sm font-semibold">{nutrition?.protein}g</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Carbohydrates</span>
              </div>
              <span className="text-sm font-semibold">{nutrition?.carbs}g</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium">Fat</span>
              </div>
              <span className="text-sm font-semibold">{nutrition?.fat}g</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Fiber</span>
              </div>
              <span className="text-sm font-semibold">{nutrition?.fiber}g</span>
            </div>
          </div>
        </div>
      </div>
      {/* Ayurvedic Balance */}
      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Ayurvedic Properties Balance</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(ayurvedicBalance)?.map(([property, count]) => (
            <div key={property} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getPropertyIcon(property)}</span>
                <span className="text-sm font-medium capitalize">{property}</span>
              </div>
              <span className="text-sm font-semibold">{count}</span>
            </div>
          ))}
        </div>
        
        {/* Balance Recommendation */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Ayurvedic Balance Insight</p>
              <p className="text-sm text-blue-700">
                The current meal plan shows a balanced distribution of Ayurvedic properties. 
                Consider the patient's constitution and current season for optimal results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalSummary;