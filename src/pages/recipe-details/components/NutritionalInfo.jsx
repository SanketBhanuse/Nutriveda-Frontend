import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';

const NutritionalInfo = ({ nutrition }) => {
  const [activeView, setActiveView] = useState('overview');

  const macroData = [
    { name: 'Carbs', value: nutrition?.carbohydrates, color: '#22C55E' },
    { name: 'Protein', value: nutrition?.protein, color: '#F59E0B' },
    { name: 'Fat', value: nutrition?.fat, color: '#EF4444' },
    { name: 'Fiber', value: nutrition?.fiber, color: '#8B5CF6' }
  ];

  const vitaminData = [
    { name: 'Vit A', value: nutrition?.vitamins?.vitaminA, unit: 'IU' },
    { name: 'Vit C', value: nutrition?.vitamins?.vitaminC, unit: 'mg' },
    { name: 'Vit D', value: nutrition?.vitamins?.vitaminD, unit: 'IU' },
    { name: 'Vit E', value: nutrition?.vitamins?.vitaminE, unit: 'mg' }
  ];

  const mineralData = [
    { name: 'Iron', value: nutrition?.minerals?.iron, unit: 'mg' },
    { name: 'Calcium', value: nutrition?.minerals?.calcium, unit: 'mg' },
    { name: 'Potassium', value: nutrition?.minerals?.potassium, unit: 'mg' },
    { name: 'Magnesium', value: nutrition?.minerals?.magnesium, unit: 'mg' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-soft">
          <p className="font-medium">{payload?.[0]?.name}</p>
          <p className="text-primary">{payload?.[0]?.value}g</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Nutritional Information</h2>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-3 py-1 rounded text-sm font-medium transition-smooth ${
              activeView === 'overview' ?'bg-white text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('detailed')}
            className={`px-3 py-1 rounded text-sm font-medium transition-smooth ${
              activeView === 'detailed' ?'bg-white text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-foreground mb-4">Macronutrient Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Key Nutritional Facts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span className="font-medium">Calories</span>
                </div>
                <span className="text-lg font-bold text-primary">{nutrition?.calories}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-success/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-lg font-bold text-success">{nutrition?.protein}g</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-lg font-bold text-warning">{nutrition?.carbohydrates}g</p>
                </div>
                <div className="p-3 bg-error/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-lg font-bold text-error">{nutrition?.fat}g</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Fiber</p>
                  <p className="text-lg font-bold text-purple-600">{nutrition?.fiber}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeView === 'detailed' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-foreground mb-4">Vitamins</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vitaminData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name, props) => [`${value} ${props?.payload?.unit}`, name]} />
                  <Bar dataKey="value" fill="#22C55E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Minerals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mineralData?.map((mineral, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">{mineral?.name}</p>
                  <p className="text-lg font-bold text-foreground">{mineral?.value}</p>
                  <p className="text-xs text-muted-foreground">{mineral?.unit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Nutritional Highlights</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High in dietary fiber for digestive health</li>
              <li>• Rich in antioxidants from natural spices</li>
              <li>• Balanced macronutrient profile</li>
              <li>• Contains essential minerals for bone health</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionalInfo;