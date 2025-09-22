import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DoctorDashboard from './pages/doctor-dashboard';
import AuthenticationLogin from './pages/authentication-login';
import PatientDashboard from './pages/patient-dashboard';
import AddNewPatient from './pages/add-new-patient';
import GenerateDietChart from './pages/generate-diet-chart';
import RecipeDetailsPage from './pages/recipe-details';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddNewPatient />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/authentication-login" element={<AuthenticationLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/add-new-patient" element={<AddNewPatient />} />
        <Route path="/generate-diet-chart" element={<GenerateDietChart />} />
        <Route path="/recipe-details" element={<RecipeDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
