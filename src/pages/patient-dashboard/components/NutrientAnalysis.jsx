import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const NutrientAnalysis = () => {
  const nutritionData = [
    { name: 'Carbohydrates', value: 45, color: '#22C55E', calories: 646 },
    { name: 'Proteins', value: 25, color: '#F59E0B', calories: 359 },
    { name: 'Fats', value: 20, color: '#EF4444', calories: 287 },
    { name: 'Fiber', value: 10, color: '#8B5CF6', calories: 143 }
  ];

  const totalCalories = nutritionData?.reduce((sum, item) => sum + item?.calories, 0);
  const targetCalories = 1500;
  const calorieProgress = (totalCalories / targetCalories) * 100;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value}% ({data?.calories} kcal)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-foreground">{entry?.value}</span>
            <span className="text-xs text-muted-foreground">
              {nutritionData?.find(item => item?.name === entry?.value)?.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="PieChart" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Nutrient Analysis</h2>
          <p className="text-sm text-muted-foreground">Today's nutritional breakdown</p>
        </div>
      </div>
      {/* Calorie Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Daily Calories</span>
          <span className="text-sm text-muted-foreground">
            {totalCalories} / {targetCalories} kcal
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-smooth ${
              calorieProgress >= 100 ? 'bg-success' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(calorieProgress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-xs text-muted-foreground">{targetCalories}</span>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={nutritionData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {nutritionData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Detailed Breakdown */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground mb-3">Detailed Breakdown</h3>
        {nutritionData?.map((nutrient, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: nutrient?.color }}
              />
              <span className="font-medium text-foreground">{nutrient?.name}</span>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{nutrient?.calories} kcal</p>
              <p className="text-sm text-muted-foreground">{nutrient?.value}%</p>
            </div>
          </div>
        ))}
      </div>
      {/* Ayurvedic Insights */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Ayurvedic Insight</h4>
            <p className="text-sm text-muted-foreground">
              Your current meal plan maintains a balanced Vata-Pitta constitution with cooling foods dominating. 
              Consider adding more warming spices in the evening to balance your dosha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrientAnalysis;