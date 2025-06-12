'use client';

import React from 'react';
import { TodoFilter } from '@/types';
import { Button } from '../ui/button';

interface FilterTabsProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onFilterChange }) => {
  const tabs = [
    { label: '모두', value: TodoFilter.ALL },
    { label: '진행 중', value: TodoFilter.ACTIVE },
    { label: '완료됨', value: TodoFilter.COMPLETED },
  ];

  return (
    <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${currentFilter === tab.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;
