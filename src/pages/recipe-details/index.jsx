import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import RecipeHeader from './components/RecipeHeader';
import IngredientsList from './components/IngredientsList';
import PreparationSteps from './components/PreparationSteps';
import AyurvedicProperties from './components/AyurvedicProperties';
import NutritionalInfo from './components/NutritionalInfo';
import HealthBenefits from './components/HealthBenefits';
import RecipeActions from './components/RecipeActions';
import RelatedRecipes from './components/RelatedRecipes';

const RecipeDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const [userRole, setUserRole] = useState('doctor');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const recipeId = searchParams?.get('id') || '1';

  // Mock recipe data
  const mockRecipe = {
    id: recipeId,
    name: "Ayurvedic Khichdi with Ghee",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
    prepTime: 45,
    servings: 4,
    difficulty: "Easy",
    calories: 285,
    description: `A traditional Ayurvedic comfort food that balances all three doshas. This nourishing khichdi combines basmati rice and yellow moong dal with digestive spices and pure ghee for optimal nutrition and easy digestion.`,
    ingredients: [
      {
        name: "Basmati Rice",
        quantity: 1,
        unit: "cup",
        ayurvedicProperties: ["sweet", "cold"],
        substitution: "Any white rice"
      },
      {
        name: "Yellow Moong Dal",
        quantity: 0.5,
        unit: "cup",
        ayurvedicProperties: ["sweet", "cold"],
        substitution: "Split yellow lentils"
      },
      {
        name: "Pure Ghee",
        quantity: 2,
        unit: "tbsp",
        ayurvedicProperties: ["sweet", "hot"],
        substitution: "Coconut oil for vegan option"
      },
      {
        name: "Cumin Seeds",
        quantity: 1,
        unit: "tsp",
        ayurvedicProperties: ["pungent", "hot"],
        substitution: "Fennel seeds"
      },
      {
        name: "Fresh Ginger",
        quantity: 1,
        unit: "inch piece",
        ayurvedicProperties: ["pungent", "hot"],
        substitution: "Ginger powder (1/2 tsp)"
      },
      {
        name: "Turmeric Powder",
        quantity: 0.5,
        unit: "tsp",
        ayurvedicProperties: ["bitter", "hot"],
        substitution: "Fresh turmeric (1 inch)"
      },
      {
        name: "Rock Salt",
        quantity: 1,
        unit: "tsp",
        ayurvedicProperties: ["salty", "hot"],
        substitution: "Sea salt"
      },
      {
        name: "Water",
        quantity: 4,
        unit: "cups",
        ayurvedicProperties: ["sweet", "cold"],
        substitution: "Vegetable broth"
      }
    ],
    steps: [
      {
        instruction: "Wash basmati rice and moong dal together until water runs clear. Soak for 15 minutes.",
        timing: "15 minutes",
        tip: "Soaking helps in better digestion and reduces cooking time"
      },
      {
        instruction: "Heat ghee in a heavy-bottomed pot over medium heat. Add cumin seeds and let them splutter.",
        timing: "2 minutes",
        tip: "The aroma of cumin indicates proper tempering"
      },
      {
        instruction: "Add minced ginger and sauté for 30 seconds until fragrant.",
        timing: "30 seconds"
      },
      {
        instruction: "Add drained rice and dal mixture. Stir gently for 2-3 minutes to coat with ghee.",
        timing: "3 minutes",
        tip: "This step enhances flavor and prevents sticking"
      },
      {
        instruction: "Add turmeric powder, salt, and water. Bring to a boil.",
        timing: "5 minutes"
      },
      {
        instruction: "Reduce heat to low, cover partially, and simmer until rice and dal are completely soft.",
        timing: "20-25 minutes",
        tip: "Stir occasionally to prevent sticking at the bottom"
      },
      {
        instruction: "Mash lightly with a spoon for desired consistency. Adjust salt and add extra ghee if needed.",
        timing: "2 minutes"
      },
      {
        instruction: "Garnish with fresh coriander and serve hot with yogurt or pickle.",
        tip: "Best consumed warm for optimal digestion"
      }
    ],
    ayurvedicProperties: {
      digestibility: {
        level: "Easy",
        description: "Light and easily digestible, suitable for all ages and digestive capacities. Ideal for recovery and detox."
      },
      potency: {
        type: "Neutral",
        description: "Balanced heating and cooling properties make it suitable for all seasons and constitutions."
      },
      vipaka: {
        taste: "Sweet",
        description: "Post-digestive sweet taste nourishes tissues and provides sustained energy without aggravating doshas."
      },
      doshaEffects: {
        vata: "decreases",
        pitta: "neutral",
        kapha: "neutral"
      },
      traditionalNote: "Khichdi is considered the perfect food in Ayurveda - tridoshic (balancing all three doshas), sattvic (promoting mental clarity), and easily digestible. It's often prescribed during illness, detox, and for daily nourishment."
    },
    nutrition: {
      calories: 285,
      protein: 12,
      carbohydrates: 48,
      fat: 6,
      fiber: 4,
      vitamins: {
        vitaminA: 150,
        vitaminC: 8,
        vitaminD: 0,
        vitaminE: 2
      },
      minerals: {
        iron: 3.2,
        calcium: 45,
        potassium: 320,
        magnesium: 85
      }
    },
    healthBenefits: [
      {
        category: "digestive",
        description: "Enhances digestive fire (agni) and promotes healthy gut bacteria. Easy to digest and assimilate."
      },
      {
        category: "immunity",
        description: "Turmeric and ginger boost immune function and provide anti-inflammatory benefits."
      },
      {
        category: "detox",
        description: "Helps eliminate toxins (ama) from the body and supports liver function."
      },
      {
        category: "mental",
        description: "Promotes mental clarity and calmness. Considered sattvic food for meditation practitioners."
      }
    ],
    contraindications: [
      {
        condition: "Severe Kapha Imbalance",
        reason: "May increase mucus production in some individuals with high kapha",
        alternative: "Add more warming spices like black pepper and ginger"
      },
      {
        condition: "Diabetes (with caution)",
        reason: "Contains rice which can affect blood sugar levels",
        alternative: "Use brown rice or reduce portion size, monitor blood glucose"
      }
    ],
    seasonalRecommendations: [
      {
        season: "monsoon",
        recommendation: "Ideal during rainy season for its warming and digestive properties",
        bestTime: "Lunch or early dinner"
      },
      {
        season: "winter",
        recommendation: "Perfect comfort food with extra ghee and warming spices",
        bestTime: "Any time of day"
      },
      {
        season: "spring",
        recommendation: "Good for detox with minimal ghee and added leafy greens",
        bestTime: "Lunch"
      }
    ]
  };

  const mockRelatedRecipes = [
    {
      id: "2",
      name: "Ayurvedic Dal Tadka",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      prepTime: 30,
      servings: 4,
      difficulty: "Easy",
      calories: 220,
      ayurvedicProperties: ["hot", "pungent"],
      description: "Protein-rich lentil curry with digestive spices"
    },
    {
      id: "3",
      name: "Spiced Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      prepTime: 25,
      servings: 2,
      difficulty: "Medium",
      calories: 340,
      ayurvedicProperties: ["sweet", "cold"],
      description: "Nutritious quinoa with Ayurvedic spice blend"
    },
    {
      id: "4",
      name: "Golden Milk Porridge",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      prepTime: 20,
      servings: 2,
      difficulty: "Easy",
      calories: 180,
      ayurvedicProperties: ["sweet", "hot"],
      description: "Warming breakfast porridge with turmeric and spices"
    }
  ];

  useEffect(() => {
    // Simulate authentication check
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUserRole(storedRole || 'doctor');
    }
  }, []);

  const handleSaveRecipe = (recipe, isSaved) => {
    console.log(`Recipe ${recipe?.name} ${isSaved ? 'saved' : 'unsaved'}`);
    // Implement save functionality
  };

  const handleShareRecipe = (platform) => {
    console.log(`Recipe shared on ${platform}`);
    // Analytics tracking for shares
  };

  const handlePrintRecipe = () => {
    console.log('Recipe printed');
    // Analytics tracking for prints
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbTrail userRole={userRole} />
        
        <div className="space-y-6">
          <RecipeHeader recipe={mockRecipe} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <IngredientsList 
                ingredients={mockRecipe?.ingredients} 
                defaultServings={mockRecipe?.servings} 
              />
              
              <PreparationSteps steps={mockRecipe?.steps} />
              
              <AyurvedicProperties properties={mockRecipe?.ayurvedicProperties} />
            </div>
            
            <div className="space-y-6">
              <NutritionalInfo nutrition={mockRecipe?.nutrition} />
              
              <RecipeActions
                recipe={mockRecipe}
                onSave={handleSaveRecipe}
                onShare={handleShareRecipe}
                onPrint={handlePrintRecipe}
              />
            </div>
          </div>
          
          <HealthBenefits
            benefits={mockRecipe?.healthBenefits}
            contraindications={mockRecipe?.contraindications}
            seasonalRecommendations={mockRecipe?.seasonalRecommendations}
          />
          
          <RelatedRecipes recipes={mockRelatedRecipes} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;