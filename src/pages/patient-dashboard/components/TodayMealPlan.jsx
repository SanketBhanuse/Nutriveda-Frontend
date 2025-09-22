import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TodayMealPlan = () => {
  const mealPlan = [
    {
      category: "Breakfast",
      icon: "Sunrise",
      time: "7:00 - 9:00 AM",
      items: [
        {
          id: 1,
          name: "Oats Porridge with Almonds",
          image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["🌶", "❄"],
          calories: 320,
          completed: true
        },
        {
          id: 2,
          name: "Herbal Green Tea",
          image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["❄", "🍋"],
          calories: 5,
          completed: true
        }
      ]
    },
    {
      category: "Lunch",
      icon: "Sun",
      time: "12:00 - 2:00 PM",
      items: [
        {
          id: 3,
          name: "Quinoa Bowl with Vegetables",
          image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["🌶", "🍋"],
          calories: 450,
          completed: false
        },
        {
          id: 4,
          name: "Buttermilk with Cumin",
          image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["❄"],
          calories: 80,
          completed: false
        }
      ]
    },
    {
      category: "Dinner",
      icon: "Moon",
      time: "7:00 - 9:00 PM",
      items: [
        {
          id: 5,
          name: "Moong Dal Khichdi",
          image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["❄"],
          calories: 280,
          completed: false
        },
        {
          id: 6,
          name: "Steamed Vegetables",
          image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["❄", "🍋"],
          calories: 120,
          completed: false
        }
      ]
    },
    {
      category: "Snacks",
      icon: "Coffee",
      time: "4:00 - 5:00 PM",
      items: [
        {
          id: 7,
          name: "Mixed Nuts & Seeds",
          image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
          properties: ["🌶"],
          calories: 180,
          completed: false
        }
      ]
    }
  ];

  const handleMealComplete = (mealId) => {
    // Mock function for meal completion
    console.log(`Meal ${mealId} marked as complete`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Today's Meal Plan</h2>
            <p className="text-sm text-muted-foreground">September 17, 2025</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Calories</p>
          <p className="text-lg font-semibold text-primary">1,435 kcal</p>
        </div>
      </div>
      <div className="space-y-6">
        {mealPlan?.map((meal) => (
          <div key={meal?.category} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name={meal?.icon} size={16} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{meal?.category}</h3>
                  <p className="text-xs text-muted-foreground">{meal?.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {meal?.items?.filter(item => item?.completed)?.length}/{meal?.items?.length} completed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meal?.items?.map((item) => (
                <div
                  key={item?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                    item?.completed
                      ? 'bg-success/5 border-success/20' :'bg-muted/30 border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {item?.completed && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/recipe-details"
                      state={{ recipe: item }}
                      className="block hover:text-primary transition-smooth"
                    >
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {item?.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          {item?.properties?.map((prop, index) => (
                            <span key={index} className="text-sm">{prop}</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item?.calories} kcal
                        </span>
                      </div>
                    </Link>
                  </div>

                  {!item?.completed && (
                    <button
                      onClick={() => handleMealComplete(item?.id)}
                      className="w-6 h-6 border-2 border-border rounded-full hover:border-primary transition-smooth"
                      title="Mark as completed"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayMealPlan;