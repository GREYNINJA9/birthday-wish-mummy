import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
      <div 
        className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;