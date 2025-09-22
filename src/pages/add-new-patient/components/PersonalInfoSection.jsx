import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, handleInputChange, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
          1
        </div>
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter patient's full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        <Input
          label="Age"
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData?.age}
          onChange={handleInputChange}
          error={errors?.age}
          min="1"
          max="120"
          required
        />

        <Select
          label="Gender"
          name="gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange({ target: { name: 'gender', value } })}
          error={errors?.gender}
          placeholder="Select gender"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="Enter 10-digit mobile number"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          description="Optional - for sending diet charts digitally"
        />

        <Select
          label="Blood Group"
          name="bloodGroup"
          options={bloodGroupOptions}
          value={formData?.bloodGroup}
          onChange={(value) => handleInputChange({ target: { name: 'bloodGroup', value } })}
          error={errors?.bloodGroup}
          placeholder="Select blood group"
          description="Optional - for comprehensive health records"
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Address"
          type="text"
          name="address"
          placeholder="Enter complete address"
          value={formData?.address}
          onChange={handleInputChange}
          error={errors?.address}
          description="Include city, state, and pincode"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;