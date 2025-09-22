import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecipeHeader = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
      <div className="relative h-64 md:h-80">
        <Image
          src={recipe?.image}
          alt={recipe?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{recipe?.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{recipe?.prepTime} mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{recipe?.servings} servings</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ChefHat" size={16} />
              <span>{recipe?.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;