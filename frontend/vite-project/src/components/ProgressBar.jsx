import React from 'react';

const ProgressBar = ({ value, total }) => {
  const percentage = (value / total) * 100;

  return (
    <div className="relative h-5 bg-gray-200 rounded overflow-hidden w-full">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center font-medium text-black">
        {value} / {total}
      </span>
    </div>
  );
};

export default ProgressBar;
