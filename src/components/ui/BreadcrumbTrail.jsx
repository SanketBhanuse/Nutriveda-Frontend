import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ userRole = 'doctor' }) => {
  const location = useLocation();
  
  const routeLabels = {
    '/doctor-dashboard': 'Dashboard',
    '/patient-dashboard': 'Dashboard',
    '/add-new-patient': 'Add New Patient',
    '/generate-diet-chart': 'Generate Diet Chart',
    '/recipe-details': 'Recipe Details',
    '/authentication-login': 'Login',
  };

  const routeParents = {
    '/add-new-patient': userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard',
    '/generate-diet-chart': userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard',
    '/recipe-details': userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard',
  };

  const generateBreadcrumbs = () => {
    const currentPath = location?.pathname;
    const breadcrumbs = [];

    // Add home/dashboard
    const dashboardPath = userRole === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard';
    if (currentPath !== dashboardPath) {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: dashboardPath,
        isActive: false,
      });
    }

    // Add current page
    if (routeLabels?.[currentPath]) {
      breadcrumbs?.push({
        label: routeLabels?.[currentPath],
        path: currentPath,
        isActive: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard or login pages
  if (location?.pathname === '/doctor-dashboard' || 
      location?.pathname === '/patient-dashboard' || 
      location?.pathname === '/authentication-login' ||
      breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={14} />
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {crumb?.isActive ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground transition-smooth"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;