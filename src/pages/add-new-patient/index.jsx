import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PersonalInfoSection from './components/PersonalInfoSection';
import MedicalHistorySection from './components/MedicalHistorySection';
import AyurvedicAssessmentSection from './components/AyurvedicAssessmentSection';
import FormProgressIndicator from './components/FormProgressIndicator';
import FormActions from './components/FormActions';
import Icon from '../../components/AppIcon';

const AddNewPatient = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSections, setCompletedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    bloodGroup: '',
    address: '',
    
    // Medical History
    primaryCondition: '',
    currentMedications: '',
    previousTreatments: '',
    allergies: [],
    medicalNotes: '',
    
    // Ayurvedic Assessment
    constitution: '',
    digestiveStrength: '',
    activityLevel: '',
    dietaryPreference: '',
    lifestyleFactors: [],
    additionalNotes: ''
  });

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [formData, hasUnsavedChanges]);

  // Track form completion
  useEffect(() => {
    updateCompletedSections();
    updateCurrentStep();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error for this field
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (fieldName, value, checked) => {
    setFormData(prev => {
      const currentArray = prev?.[fieldName] || [];
      if (checked) {
        return {
          ...prev,
          [fieldName]: [...currentArray, value]
        };
      } else {
        return {
          ...prev,
          [fieldName]: currentArray?.filter(item => item !== value)
        };
      }
    });
    setHasUnsavedChanges(true);
  };

  const updateCompletedSections = () => {
    const completed = [];
    
    // Check Personal Information completion
    if (formData?.fullName && formData?.age && formData?.gender && formData?.phoneNumber) {
      completed?.push(1);
    }
    
    // Check Medical History completion
    if (formData?.primaryCondition) {
      completed?.push(2);
    }
    
    // Check Ayurvedic Assessment completion
    if (formData?.constitution && formData?.digestiveStrength && formData?.activityLevel && formData?.dietaryPreference) {
      completed?.push(3);
    }
    
    setCompletedSections(completed);
  };

  const updateCurrentStep = () => {
    if (!formData?.fullName || !formData?.age || !formData?.gender || !formData?.phoneNumber) {
      setCurrentStep(1);
    } else if (!formData?.primaryCondition) {
      setCurrentStep(2);
    } else if (!formData?.constitution || !formData?.digestiveStrength || !formData?.activityLevel || !formData?.dietaryPreference) {
      setCurrentStep(3);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData?.age || formData?.age < 1 || formData?.age > 120) {
      newErrors.age = 'Please enter a valid age between 1-120';
    }
    if (!formData?.gender) {
      newErrors.gender = 'Gender selection is required';
    }
    if (!formData?.phoneNumber || !/^[0-9]{10}$/.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Medical History validation
    if (!formData?.primaryCondition) {
      newErrors.primaryCondition = 'Primary medical condition is required';
    }

    // Ayurvedic Assessment validation
    if (!formData?.constitution) {
      newErrors.constitution = 'Constitutional type is required';
    }
    if (!formData?.digestiveStrength) {
      newErrors.digestiveStrength = 'Digestive strength assessment is required';
    }
    if (!formData?.activityLevel) {
      newErrors.activityLevel = 'Activity level is required';
    }
    if (!formData?.dietaryPreference) {
      newErrors.dietaryPreference = 'Dietary preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAutoSave = () => {
    // Simulate auto-save
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock patient data with generated ID
      const newPatient = {
        id: Date.now(),
        ...formData,
        createdAt: new Date()?.toISOString(),
        status: 'active'
      };

      // In a real app, this would be saved to backend
      console.log('New patient saved:', newPatient);
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      // Navigate back to doctor dashboard
      navigate('/doctor-dashboard', { 
        state: { 
          message: `Patient "${formData?.fullName}" has been successfully added to your practice.`,
          newPatientId: newPatient?.id
        }
      });
      
    } catch (error) {
      console.error('Error saving patient:', error);
      setErrors({ submit: 'Failed to save patient. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (!confirmLeave) return;
    }
    navigate('/doctor-dashboard');
  };

  const isSaveDisabled = completedSections?.length < 3 || isLoading;

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        userRole="doctor" 
        isAuthenticated={true} 
        onLogout={() => navigate('/login')} 
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail userRole="doctor" />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="UserPlus" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Patient</h1>
              <p className="text-muted-foreground">Create a comprehensive patient profile for personalized Ayurvedic care</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <FormProgressIndicator 
          currentStep={currentStep}
          totalSteps={3}
          completedSections={completedSections}
        />

        {/* Form Sections */}
        <div className="space-y-8">
          <PersonalInfoSection 
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          
          <MedicalHistorySection 
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
          
          <AyurvedicAssessmentSection 
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
        </div>

        {/* Form Actions */}
        <div className="mt-8">
          <FormActions 
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading}
            isSaveDisabled={isSaveDisabled}
            hasUnsavedChanges={hasUnsavedChanges}
            lastSaved={lastSaved}
          />
        </div>

        {/* Error Display */}
        {errors?.submit && (
          <div className="mt-4 bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error font-medium">{errors?.submit}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewPatient;