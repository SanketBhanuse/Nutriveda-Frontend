import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedMenu = ({ userRole = 'doctor', className = '' }) => {
  const location = useLocation();

  const doctorMenuItems = [
    {
      label: 'Dashboard',
      path: '/doctor-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview of patients and activities'
    },
    {
      label: 'Patient Management',
      icon: 'Users',
      children: [
        {
          label: 'Add New Patient',
          path: '/add-new-patient',
          icon: 'UserPlus',
          description: 'Register new patient'
        },
        {
          label: 'Generate Diet Chart',
          path: '/generate-diet-chart',
          icon: 'FileText',
          description: 'Create personalized diet plans'
        }
      ]
    },
    {
      label: 'Recipes',
      path: '/recipe-details',
      icon: 'ChefHat',
      description: 'Browse Ayurvedic recipes'
    }
  ];

  const patientMenuItems = [
    {
      label: 'Dashboard',
      path: '/patient-dashboard',
      icon: 'LayoutDashboard',
      description: 'Your daily meal plan and progress'
    },
    {
      label: 'My Recipes',
      path: '/recipe-details',
      icon: 'ChefHat',
      description: 'Explore your recommended recipes'
    }
  ];

  const menuItems = userRole === 'doctor' ? doctorMenuItems : patientMenuItems;

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const hasActiveChild = (children) => {
    return children?.some(child => isActiveRoute(child?.path));
  };

  const renderMenuItem = (item, isChild = false) => {
    const hasChildren = item?.children && item?.children?.length > 0;
    const isActive = item?.path ? isActiveRoute(item?.path) : hasActiveChild(item?.children);

    if (hasChildren) {
      return (
        <div key={item?.label} className="space-y-1">
          <div className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium text-muted-foreground ${
            isActive ? 'text-primary' : ''
          }`}>
            <Icon name={item?.icon} size={16} />
            <span>{item?.label}</span>
          </div>
          <div className="ml-6 space-y-1">
            {item?.children?.map(child => renderMenuItem(child, true))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item?.path}
        to={item?.path}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth group ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${isChild ? 'ml-3' : ''}`}
        title={item?.description}
      >
        <Icon name={item?.icon} size={16} />
        <div className="flex-1">
          <div>{item?.label}</div>
          {item?.description && !isActive && (
            <div className="text-xs opacity-0 group-hover:opacity-100 transition-smooth">
              {item?.description}
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <nav className={`space-y-2 ${className}`} role="navigation" aria-label="Main navigation">
      {menuItems?.map(item => renderMenuItem(item))}
    </nav>
  );
};

export default RoleBasedMenu;