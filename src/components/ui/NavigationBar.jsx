import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = ({ userRole = 'doctor', isAuthenticated = true, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const doctorMenuItems = [
    { label: 'Dashboard', path: '/doctor-dashboard', icon: 'LayoutDashboard' },
    { label: 'Add Patient', path: '/add-new-patient', icon: 'UserPlus' },
    { label: 'Diet Charts', path: '/generate-diet-chart', icon: 'FileText' },
    { label: 'Recipes', path: '/recipe-details', icon: 'ChefHat' },
  ];

  const patientMenuItems = [
    { label: 'Dashboard', path: '/patient-dashboard', icon: 'LayoutDashboard' },
    { label: 'My Recipes', path: '/recipe-details', icon: 'ChefHat' },
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems : patientMenuItems;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/authentication-login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">NutriVeda</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="User" size={16} />
                <span className="capitalize">{userRole}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                iconSize={16}
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                iconSize={20}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-elevated animate-slide-in">
            <div className="px-4 py-4 space-y-2">
              {menuItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center space-x-3 px-4 py-2 text-sm text-muted-foreground">
                  <Icon name="User" size={18} />
                  <span className="capitalize">{userRole} Account</span>
                </div>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={18}
                  className="justify-start mt-2"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default NavigationBar;