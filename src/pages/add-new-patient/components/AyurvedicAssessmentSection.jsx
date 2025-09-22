import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AyurvedicAssessmentSection = ({ formData, handleInputChange, handleCheckboxChange, errors }) => {
  const constitutionOptions = [
    { value: 'vata', label: 'Vata (Air & Space)', description: 'Dry, light, cold, rough, subtle, mobile' },
    { value: 'pitta', label: 'Pitta (Fire & Water)', description: 'Hot, sharp, light, oily, liquid, mobile' },
    { value: 'kapha', label: 'Kapha (Earth & Water)', description: 'Heavy, slow, cold, oily, smooth, stable' },
    { value: 'vata_pitta', label: 'Vata-Pitta', description: 'Combination of air and fire elements' },
    { value: 'pitta_kapha', label: 'Pitta-Kapha', description: 'Combination of fire and earth elements' },
    { value: 'vata_kapha', label: 'Vata-Kapha', description: 'Combination of air and earth elements' },
    { value: 'tridoshic', label: 'Tridoshic', description: 'Balanced combination of all three doshas' }
  ];

  const digestiveStrengthOptions = [
    { value: 'strong', label: 'Strong (Tikshna Agni)', description: 'Can digest heavy foods easily' },
    { value: 'moderate', label: 'Moderate (Sama Agni)', description: 'Normal digestive capacity' },
    { value: 'weak', label: 'Weak (Manda Agni)', description: 'Difficulty digesting heavy foods' },
    { value: 'irregular', label: 'Irregular (Vishama Agni)', description: 'Unpredictable digestive patterns' }
  ];

  const activityLevelOptions = [
    { value: 'sedentary', label: 'Sedentary', description: 'Minimal physical activity' },
    { value: 'light', label: 'Light Activity', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate Activity', description: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'extremely_active', label: 'Extremely Active', description: 'Physical job + exercise' }
  ];

  const dietaryPreferences = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'jain', label: 'Jain (No root vegetables)' },
    { id: 'non_vegetarian', label: 'Non-Vegetarian' },
    { id: 'eggetarian', label: 'Eggetarian' },
    { id: 'pescatarian', label: 'Pescatarian (Fish only)' }
  ];

  const lifestyleFactors = [
    { id: 'irregular_sleep', label: 'Irregular Sleep Pattern' },
    { id: 'high_stress', label: 'High Stress Levels' },
    { id: 'frequent_travel', label: 'Frequent Travel' },
    { id: 'shift_work', label: 'Shift Work/Night Shifts' },
    { id: 'smoking', label: 'Smoking' },
    { id: 'alcohol', label: 'Regular Alcohol Consumption' },
    { id: 'caffeine_dependent', label: 'High Caffeine Intake' },
    { id: 'emotional_eating', label: 'Emotional Eating Patterns' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
          3
        </div>
        <h3 className="text-lg font-semibold text-foreground">Ayurvedic Assessment</h3>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Select
          label="Constitutional Type (Prakriti)"
          name="constitution"
          options={constitutionOptions}
          value={formData?.constitution}
          onChange={(value) => handleInputChange({ target: { name: 'constitution', value } })}
          error={errors?.constitution}
          placeholder="Select constitutional type"
          required
          description="Based on physical and mental characteristics assessment"
        />

        <Select
          label="Digestive Strength (Agni)"
          name="digestiveStrength"
          options={digestiveStrengthOptions}
          value={formData?.digestiveStrength}
          onChange={(value) => handleInputChange({ target: { name: 'digestiveStrength', value } })}
          error={errors?.digestiveStrength}
          placeholder="Select digestive capacity"
          required
          description="Determines meal timing and food combinations"
        />

        <Select
          label="Activity Level"
          name="activityLevel"
          options={activityLevelOptions}
          value={formData?.activityLevel}
          onChange={(value) => handleInputChange({ target: { name: 'activityLevel', value } })}
          error={errors?.activityLevel}
          placeholder="Select activity level"
          required
          description="Helps determine caloric requirements"
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Dietary Preferences
            <span className="text-error ml-1">*</span>
            <span className="text-muted-foreground ml-1">(Select one)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryPreferences?.map((preference) => (
              <Checkbox
                key={preference?.id}
                label={preference?.label}
                checked={formData?.dietaryPreference === preference?.id}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    handleInputChange({ target: { name: 'dietaryPreference', value: preference?.id } });
                  }
                }}
              />
            ))}
          </div>
          {errors?.dietaryPreference && (
            <p className="text-sm text-error mt-1">{errors?.dietaryPreference}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Lifestyle Factors
            <span className="text-muted-foreground ml-1">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lifestyleFactors?.map((factor) => (
              <Checkbox
                key={factor?.id}
                label={factor?.label}
                checked={formData?.lifestyleFactors?.includes(factor?.id) || false}
                onChange={(e) => handleCheckboxChange('lifestyleFactors', factor?.id, e?.target?.checked)}
              />
            ))}
          </div>
          {errors?.lifestyleFactors && (
            <p className="text-sm text-error mt-1">{errors?.lifestyleFactors}</p>
          )}
        </div>

        <Input
          label="Additional Notes"
          type="text"
          name="additionalNotes"
          placeholder="Any specific dietary requirements or preferences"
          value={formData?.additionalNotes}
          onChange={handleInputChange}
          error={errors?.additionalNotes}
          description="Include food likes/dislikes, cultural preferences, or special requirements"
        />
      </div>
    </div>
  );
};

export default AyurvedicAssessmentSection;