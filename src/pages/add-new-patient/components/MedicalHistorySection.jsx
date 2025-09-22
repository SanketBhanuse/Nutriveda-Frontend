import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const MedicalHistorySection = ({ formData, handleInputChange, handleCheckboxChange, errors }) => {
  const medicalConditionOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'digestive_issues', label: 'Digestive Issues' },
    { value: 'arthritis', label: 'Arthritis' },
    { value: 'thyroid', label: 'Thyroid Disorders' },
    { value: 'heart_disease', label: 'Heart Disease' },
    { value: 'kidney_disease', label: 'Kidney Disease' },
    { value: 'liver_disease', label: 'Liver Disease' },
    { value: 'respiratory', label: 'Respiratory Issues' },
    { value: 'skin_conditions', label: 'Skin Conditions' },
    { value: 'mental_health', label: 'Mental Health' },
    { value: 'other', label: 'Other' }
  ];

  const commonAllergies = [
    { id: 'dairy', label: 'Dairy Products' },
    { id: 'nuts', label: 'Nuts & Seeds' },
    { id: 'gluten', label: 'Gluten/Wheat' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'soy', label: 'Soy Products' },
    { id: 'spices', label: 'Certain Spices' },
    { id: 'fruits', label: 'Citrus Fruits' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
          2
        </div>
        <h3 className="text-lg font-semibold text-foreground">Medical History</h3>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Select
          label="Primary Medical Condition"
          name="primaryCondition"
          options={medicalConditionOptions}
          value={formData?.primaryCondition}
          onChange={(value) => handleInputChange({ target: { name: 'primaryCondition', value } })}
          error={errors?.primaryCondition}
          placeholder="Select primary condition"
          searchable
          required
          description="Main health concern requiring dietary management"
        />

        <Input
          label="Current Medications"
          type="text"
          name="currentMedications"
          placeholder="List current medications (if any)"
          value={formData?.currentMedications}
          onChange={handleInputChange}
          error={errors?.currentMedications}
          description="Include dosage and frequency - helps avoid food-drug interactions"
        />

        <Input
          label="Previous Ayurvedic Treatments"
          type="text"
          name="previousTreatments"
          placeholder="Describe any previous Ayurvedic treatments"
          value={formData?.previousTreatments}
          onChange={handleInputChange}
          error={errors?.previousTreatments}
          description="Include treatments, duration, and effectiveness"
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Food Allergies & Intolerances
            <span className="text-muted-foreground ml-1">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonAllergies?.map((allergy) => (
              <Checkbox
                key={allergy?.id}
                label={allergy?.label}
                checked={formData?.allergies?.includes(allergy?.id) || false}
                onChange={(e) => handleCheckboxChange('allergies', allergy?.id, e?.target?.checked)}
              />
            ))}
          </div>
          {errors?.allergies && (
            <p className="text-sm text-error mt-1">{errors?.allergies}</p>
          )}
        </div>

        <Input
          label="Other Medical Notes"
          type="text"
          name="medicalNotes"
          placeholder="Any other relevant medical information"
          value={formData?.medicalNotes}
          onChange={handleInputChange}
          error={errors?.medicalNotes}
          description="Include family history, surgical history, or other relevant details"
        />
      </div>
    </div>
  );
};

export default MedicalHistorySection;