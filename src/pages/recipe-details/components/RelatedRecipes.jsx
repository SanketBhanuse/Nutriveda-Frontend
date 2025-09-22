import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedRecipes = ({ recipes }) => {
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
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Related Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes?.map((recipe) => (
          <Link
            key={recipe?.id}
            to={`/recipe-details?id=${recipe?.id}`}
            className="group block bg-background border border-border rounded-lg overflow-hidden hover:border-primary/30 hover:shadow-elevated transition-smooth"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={recipe?.image}
                alt={recipe?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <div className="flex items-center space-x-1">
                  {recipe?.ayurvedicProperties?.slice(0, 2)?.map((property, index) => (
                    <span key={index} className="text-sm">
                      {getAyurvedicIcon(property)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-smooth">
                {recipe?.name}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{recipe?.prepTime} mins</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{recipe?.servings}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="ChefHat" size={14} />
                  <span>{recipe?.difficulty}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {recipe?.description}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-primary">
                  <Icon name="Zap" size={14} />
                  <span>{recipe?.calories} cal</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground group-hover:text-primary transition-smooth">
                  <span>View Recipe</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/recipe-details"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-smooth"
        >
          <span>Explore More Recipes</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default RelatedRecipes;