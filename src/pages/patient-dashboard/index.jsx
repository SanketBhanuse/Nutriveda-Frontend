import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import AuthenticationGuard from '../../components/ui/AuthenticationGuard';
import TodayMealPlan from './components/TodayMealPlan';
import NutrientAnalysis from './components/NutrientAnalysis';
import StreakCounter from './components/StreakCounter';
import AchievementBadges from './components/AchievementBadges';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';

const PatientDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('patient');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getNextMeal = () => {
    const hour = currentTime?.getHours();
    if (hour < 9) return { meal: 'Breakfast', time: '7:00 - 9:00 AM', icon: 'Sunrise' };
    if (hour < 14) return { meal: 'Lunch', time: '12:00 - 2:00 PM', icon: 'Sun' };
    if (hour < 17) return { meal: 'Snacks', time: '4:00 - 5:00 PM', icon: 'Coffee' };
    if (hour < 21) return { meal: 'Dinner', time: '7:00 - 9:00 PM', icon: 'Moon' };
    return { meal: 'Breakfast', time: 'Tomorrow 7:00 AM', icon: 'Sunrise' };
  };

  const nextMeal = getNextMeal();

  return (
    <AuthenticationGuard
      isAuthenticated={isAuthenticated}
      userRole={userRole}
      requiredRole="patient"
    >
      <Helmet>
        <title>Patient Dashboard - NutriVeda</title>
        <meta name="description" content="Your personalized Ayurvedic meal plan, nutritional tracking, and wellness achievements dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail userRole={userRole} />

          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {getGreeting()}, Priya! 👋
                </h1>
                <p className="text-muted-foreground">
                  Ready to continue your Ayurvedic wellness journey today?
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-3 bg-card border border-border rounded-lg p-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={nextMeal?.icon} size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Next: {nextMeal?.meal}</p>
                    <p className="text-sm text-muted-foreground">{nextMeal?.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <TodayMealPlan />
              <NutrientAnalysis />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <StreakCounter />
              <QuickActions />
            </div>
          </div>

          {/* Full Width Achievement Section */}
          <div className="mt-8">
            <AchievementBadges />
          </div>

          {/* Daily Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
              <p className="text-lg font-semibold text-foreground">2/4</p>
              <p className="text-sm text-muted-foreground">Meals Completed</p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Droplets" size={20} className="text-primary" />
              </div>
              <p className="text-lg font-semibold text-foreground">6/8</p>
              <p className="text-sm text-muted-foreground">Glasses Water</p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Activity" size={20} className="text-warning" />
              </div>
              <p className="text-lg font-semibold text-foreground">1,435</p>
              <p className="text-sm text-muted-foreground">Calories Today</p>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Target" size={20} className="text-accent" />
              </div>
              <p className="text-lg font-semibold text-foreground">95%</p>
              <p className="text-sm text-muted-foreground">Weekly Goal</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationGuard>
  );
};

export default PatientDashboard;