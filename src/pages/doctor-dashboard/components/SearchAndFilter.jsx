import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, onViewChange, currentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Hypertension', label: 'Hypertension' },
    { value: 'Obesity', label: 'Obesity' },
    { value: 'Digestive Issues', label: 'Digestive Issues' },
    { value: 'Arthritis', label: 'Arthritis' },
    { value: 'Stress', label: 'Stress' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleConditionChange = (value) => {
    setSelectedCondition(value);
    onFilter({ condition: value, status: selectedStatus });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilter({ condition: selectedCondition, status: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCondition('');
    setSelectedStatus('');
    onSearch('');
    onFilter({ condition: '', status: '' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Select
            placeholder="Filter by condition"
            options={conditionOptions}
            value={selectedCondition}
            onChange={handleConditionChange}
            className="min-w-[180px]"
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            className="min-w-[150px]"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <Button
            variant={currentView === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('grid')}
            iconName="Grid3X3"
            iconSize={16}
            className="px-3"
          />
          <Button
            variant={currentView === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('table')}
            iconName="List"
            iconSize={16}
            className="px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;