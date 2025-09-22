import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import SummaryMetrics from './components/SummaryMetrics';
import SearchAndFilter from './components/SearchAndFilter';
import PatientCard from './components/PatientCard';
import PatientTable from './components/PatientTable';
import RecentActivity from './components/RecentActivity';
import Icon from '../../components/AppIcon';


const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ condition: '', status: '' });
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Mock data for patients
  const mockPatients = [
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 45,
      phone: "+91 98765 43210",
      condition: "Diabetes",
      lastConsultation: "2025-01-15",
      status: "Active",
      currentTreatment: "Ayurvedic Diet Plan"
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 38,
      phone: "+91 87654 32109",
      condition: "Hypertension",
      lastConsultation: "2025-01-12",
      status: "Active",
      currentTreatment: "Herbal Medication"
    },
    {
      id: 3,
      name: "Amit Patel",
      age: 52,
      phone: "+91 76543 21098",
      condition: "Obesity",
      lastConsultation: "2025-01-10",
      status: "Active",
      currentTreatment: "Weight Management Plan"
    },
    {
      id: 4,
      name: "Sunita Gupta",
      age: 41,
      phone: "+91 65432 10987",
      condition: "Digestive Issues",
      lastConsultation: "2025-01-08",
      status: "Active",
      currentTreatment: "Digestive Therapy"
    },
    {
      id: 5,
      name: "Vikram Singh",
      age: 48,
      phone: "+91 54321 09876",
      condition: "Arthritis",
      lastConsultation: "2025-01-05",
      status: "Inactive",
      currentTreatment: "Joint Care Program"
    },
    {
      id: 6,
      name: "Meera Reddy",
      age: 35,
      phone: "+91 43210 98765",
      condition: "Stress",
      lastConsultation: "2025-01-14",
      status: "Active",
      currentTreatment: "Stress Management"
    }
  ];

  // Mock summary metrics
  const summaryMetrics = {
    totalPatients: mockPatients?.length,
    activeTreatments: mockPatients?.filter(p => p?.status === 'Active')?.length,
    consultationsToday: 3,
    dietChartsGenerated: 12
  };

  // Mock recent activities
  const recentActivities = [
    {
      type: 'consultation',
      title: 'Consultation Completed',
      description: 'Follow-up consultation for diabetes management',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      patientName: 'Rajesh Kumar'
    },
    {
      type: 'diet_chart',
      title: 'Diet Chart Generated',
      description: 'New personalized diet plan created',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      patientName: 'Priya Sharma'
    },
    {
      type: 'patient_added',
      title: 'New Patient Added',
      description: 'Patient registration completed successfully',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      patientName: 'Meera Reddy'
    },
    {
      type: 'treatment_updated',
      title: 'Treatment Plan Updated',
      description: 'Modified treatment approach for better results',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      patientName: 'Amit Patel'
    }
  ];

  // Filter patients based on search and filters
  useEffect(() => {
    let filtered = mockPatients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.phone?.includes(searchTerm)
      );
    }

    // Apply condition filter
    if (filters?.condition) {
      filtered = filtered?.filter(patient => patient?.condition === filters?.condition);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(patient => patient?.status === filters?.status);
    }

    setFilteredPatients(filtered);
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleViewProfile = (patient) => {
    // Navigate to patient profile or show modal
    console.log('View profile for:', patient?.name);
  };

  const handleGenerateDietChart = (patient) => {
    navigate('/generate-diet-chart', { state: { patient } });
  };

  const handleAddNewPatient = () => {
    navigate('/add-new-patient');
  };

  const handleLogout = () => {
    navigate('/authentication-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        userRole="doctor" 
        isAuthenticated={true} 
        onLogout={handleLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail userRole="doctor" />
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your patients and track their Ayurvedic treatment progress
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              variant="default"
              onClick={handleAddNewPatient}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Summary Metrics */}
        <SummaryMetrics metrics={summaryMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              onViewChange={handleViewChange}
              currentView={currentView}
            />

            {/* Patient List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Patient List ({filteredPatients?.length})
                </h2>
              </div>

              {filteredPatients?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No patients found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || filters?.condition || filters?.status
                      ? 'Try adjusting your search or filters' :'Start by adding your first patient'}
                  </p>
                  <Button
                    variant="default"
                    onClick={handleAddNewPatient}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Add New Patient
                  </Button>
                </div>
              ) : (
                <>
                  {currentView === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPatients?.map((patient) => (
                        <PatientCard
                          key={patient?.id}
                          patient={patient}
                          onViewProfile={handleViewProfile}
                          onGenerateDietChart={handleGenerateDietChart}
                        />
                      ))}
                    </div>
                  ) : (
                    <PatientTable
                      patients={filteredPatients}
                      onViewProfile={handleViewProfile}
                      onGenerateDietChart={handleGenerateDietChart}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;