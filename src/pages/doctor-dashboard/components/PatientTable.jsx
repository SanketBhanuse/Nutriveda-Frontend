import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTable = ({ patients, onViewProfile, onGenerateDietChart }) => {
  const getConditionColor = (condition) => {
    const colors = {
      'Diabetes': 'bg-red-100 text-red-800',
      'Hypertension': 'bg-orange-100 text-orange-800',
      'Obesity': 'bg-yellow-100 text-yellow-800',
      'Digestive Issues': 'bg-green-100 text-green-800',
      'Arthritis': 'bg-blue-100 text-blue-800',
      'Stress': 'bg-purple-100 text-purple-800'
    };
    return colors?.[condition] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Patient</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Age</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Condition</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Last Consultation</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient, index) => (
              <tr key={patient?.id} className={`border-t border-border hover:bg-muted/30 transition-smooth ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{patient?.name}</div>
                      <div className="text-sm text-muted-foreground">{patient?.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-muted-foreground">{patient?.age} years</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(patient?.condition)}`}>
                    {patient?.condition}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">{formatDate(patient?.lastConsultation)}</div>
                  <div className="text-xs text-muted-foreground">{getDaysAgo(patient?.lastConsultation)} days ago</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${patient?.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-muted-foreground">{patient?.status}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(patient)}
                      iconName="Eye"
                      iconSize={14}
                      className="text-muted-foreground hover:text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGenerateDietChart(patient)}
                      iconName="FileText"
                      iconSize={14}
                      className="text-muted-foreground hover:text-foreground"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;