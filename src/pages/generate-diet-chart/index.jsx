import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import PatientInfoCard from './components/PatientInfoCard';
import MealPlanningSection from './components/MealPlanningSection';
import NutritionalSummary from './components/NutritionalSummary';
import DietChartPreview from './components/DietChartPreview';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const GenerateDietChart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('doctor');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  // Mock patient data
  const mockPatient = {
    id: "P001",
    name: "Priya Sharma",
    age: 34,
    gender: "female",
    constitution: "Pitta",
    bmi: 24.5,
    lastUpdated: "17/09/2025",
    conditions: [
      { name: "Type 2 Diabetes", severity: "medium" },
      { name: "Hypertension", severity: "low" }
    ],
    allergies: ["Peanuts", "Shellfish"]
  };

  // Mock food database
  const mockFoods = {
    breakfast: [
      {
        id: "bf1",
        name: "Oats Porridge with Almonds",
        category: "Grains",
        calories: 250,
        protein: 8,
        carbs: 45,
        fat: 6,
        fiber: 4,
        ayurvedicProperty: "sweet"
      },
      {
        id: "bf2",
        name: "Moong Dal Cheela",
        category: "Legumes",
        calories: 180,
        protein: 12,
        carbs: 25,
        fat: 4,
        fiber: 6,
        ayurvedicProperty: "cold"
      },
      {
        id: "bf3",
        name: "Herbal Green Tea",
        category: "Beverages",
        calories: 5,
        protein: 0,
        carbs: 1,
        fat: 0,
        fiber: 0,
        ayurvedicProperty: "bitter"
      },
      {
        id: "bf4",
        name: "Fresh Fruit Salad",
        category: "Fruits",
        calories: 120,
        protein: 2,
        carbs: 30,
        fat: 1,
        fiber: 5,
        ayurvedicProperty: "sweet"
      }
    ],
    lunch: [
      {
        id: "l1",
        name: "Brown Rice with Dal",
        category: "Grains & Legumes",
        calories: 320,
        protein: 15,
        carbs: 58,
        fat: 3,
        fiber: 8,
        ayurvedicProperty: "sweet"
      },
      {
        id: "l2",
        name: "Steamed Vegetables",
        category: "Vegetables",
        calories: 80,
        protein: 3,
        carbs: 18,
        fat: 1,
        fiber: 6,
        ayurvedicProperty: "cold"
      },
      {
        id: "l3",
        name: "Cucumber Raita",
        category: "Dairy",
        calories: 60,
        protein: 3,
        carbs: 8,
        fat: 2,
        fiber: 1,
        ayurvedicProperty: "cold"
      },
      {
        id: "l4",
        name: "Quinoa Salad",
        category: "Grains",
        calories: 220,
        protein: 8,
        carbs: 39,
        fat: 4,
        fiber: 5,
        ayurvedicProperty: "sweet"
      }
    ],
    dinner: [
      {
        id: "d1",
        name: "Vegetable Soup",
        category: "Soups",
        calories: 90,
        protein: 4,
        carbs: 18,
        fat: 1,
        fiber: 4,
        ayurvedicProperty: "hot"
      },
      {
        id: "d2",
        name: "Roti with Ghee",
        category: "Grains",
        calories: 180,
        protein: 5,
        carbs: 30,
        fat: 6,
        fiber: 3,
        ayurvedicProperty: "sweet"
      },
      {
        id: "d3",
        name: "Palak Paneer",
        category: "Vegetables",
        calories: 200,
        protein: 12,
        carbs: 8,
        fat: 14,
        fiber: 3,
        ayurvedicProperty: "hot"
      },
      {
        id: "d4",
        name: "Turmeric Milk",
        category: "Beverages",
        calories: 150,
        protein: 8,
        carbs: 12,
        fat: 8,
        fiber: 0,
        ayurvedicProperty: "hot"
      }
    ],
    snacks: [
      {
        id: "s1",
        name: "Mixed Nuts",
        category: "Nuts",
        calories: 160,
        protein: 6,
        carbs: 6,
        fat: 14,
        fiber: 3,
        ayurvedicProperty: "hot"
      },
      {
        id: "s2",
        name: "Coconut Water",
        category: "Beverages",
        calories: 45,
        protein: 2,
        carbs: 9,
        fat: 0,
        fiber: 3,
        ayurvedicProperty: "cold"
      },
      {
        id: "s3",
        name: "Roasted Chickpeas",
        category: "Legumes",
        calories: 130,
        protein: 6,
        carbs: 22,
        fat: 2,
        fiber: 5,
        ayurvedicProperty: "astringent"
      },
      {
        id: "s4",
        name: "Herbal Tea",
        category: "Beverages",
        calories: 10,
        protein: 0,
        carbs: 2,
        fat: 0,
        fiber: 0,
        ayurvedicProperty: "bitter"
      }
    ]
  };

  // Mock recommendations based on patient constitution
  const mockRecommendations = {
    breakfast: [
      mockFoods?.breakfast?.[0], // Oats Porridge
      mockFoods?.breakfast?.[2]  // Herbal Green Tea
    ],
    lunch: [
      mockFoods?.lunch?.[0], // Brown Rice with Dal
      mockFoods?.lunch?.[2]  // Cucumber Raita
    ],
    dinner: [
      mockFoods?.dinner?.[1], // Roti with Ghee
      mockFoods?.dinner?.[3]  // Turmeric Milk
    ],
    snacks: [
      mockFoods?.snacks?.[1], // Coconut Water
      mockFoods?.snacks?.[3]  // Herbal Tea
    ]
  };

  useEffect(() => {
    // Get patient from location state or use mock data
    const patientFromState = location?.state?.patient;
    setSelectedPatient(patientFromState || mockPatient);
  }, [location?.state]);

  const handleFoodSelect = (mealType, food) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: [...prev?.[mealType], { ...food, quantity: 1 }]
    }));
  };

  const handleFoodRemove = (mealType, foodId) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: prev?.[mealType]?.filter(food => food?.id !== foodId)
    }));
  };

  const handleAutoGenerate = () => {
    // Auto-generate meal plan based on recommendations
    const autoMeals = {
      breakfast: mockRecommendations?.breakfast?.map(food => ({ ...food, quantity: 1 })),
      lunch: mockRecommendations?.lunch?.map(food => ({ ...food, quantity: 1 })),
      dinner: mockRecommendations?.dinner?.map(food => ({ ...food, quantity: 1 })),
      snacks: mockRecommendations?.snacks?.map(food => ({ ...food, quantity: 1 }))
    };
    setSelectedMeals(autoMeals);
  };

  const handleSaveDraft = () => {
    // Mock save functionality
    alert('Diet chart saved as draft successfully!');
  };

  const handleAssignToPatient = () => {
    // Mock assign functionality
    alert(`Diet chart assigned to ${selectedPatient?.name} successfully!`);
    navigate('/doctor-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/authentication-login');
  };

  if (!selectedPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No Patient Selected</h2>
          <p className="text-muted-foreground mb-4">Please select a patient to generate diet chart.</p>
          <Button onClick={() => navigate('/doctor-dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AuthenticationGuard 
      isAuthenticated={isAuthenticated} 
      userRole={userRole} 
      requiredRole="doctor"
    >
      <div className="min-h-screen bg-background">
        <NavigationBar 
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail userRole={userRole} />
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Generate Diet Chart</h1>
                <p className="text-muted-foreground mt-2">
                  Create personalized Ayurvedic meal plans for your patients
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/doctor-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Patient Information */}
              <PatientInfoCard patient={selectedPatient} />

              {/* Meal Planning Sections */}
              <div className="space-y-6">
                <MealPlanningSection
                  mealType="Breakfast"
                  icon="Coffee"
                  foods={mockFoods?.breakfast}
                  selectedFoods={selectedMeals?.breakfast}
                  onFoodSelect={(food) => handleFoodSelect('breakfast', food)}
                  onFoodRemove={(foodId) => handleFoodRemove('breakfast', foodId)}
                  recommendations={mockRecommendations?.breakfast}
                />

                <MealPlanningSection
                  mealType="Lunch"
                  icon="UtensilsCrossed"
                  foods={mockFoods?.lunch}
                  selectedFoods={selectedMeals?.lunch}
                  onFoodSelect={(food) => handleFoodSelect('lunch', food)}
                  onFoodRemove={(foodId) => handleFoodRemove('lunch', foodId)}
                  recommendations={mockRecommendations?.lunch}
                />

                <MealPlanningSection
                  mealType="Dinner"
                  icon="Moon"
                  foods={mockFoods?.dinner}
                  selectedFoods={selectedMeals?.dinner}
                  onFoodSelect={(food) => handleFoodSelect('dinner', food)}
                  onFoodRemove={(foodId) => handleFoodRemove('dinner', foodId)}
                  recommendations={mockRecommendations?.dinner}
                />

                <MealPlanningSection
                  mealType="Snacks"
                  icon="Apple"
                  foods={mockFoods?.snacks}
                  selectedFoods={selectedMeals?.snacks}
                  onFoodSelect={(food) => handleFoodSelect('snacks', food)}
                  onFoodRemove={(foodId) => handleFoodRemove('snacks', foodId)}
                  recommendations={mockRecommendations?.snacks}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Nutritional Summary */}
              <NutritionalSummary selectedMeals={selectedMeals} />

              {/* Diet Chart Preview */}
              <DietChartPreview
                selectedMeals={selectedMeals}
                patientName={selectedPatient?.name}
                onSave={handleSaveDraft}
                onAssign={handleAssignToPatient}
                onGenerateAuto={handleAutoGenerate}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticationGuard>
  );
};

export default GenerateDietChart;