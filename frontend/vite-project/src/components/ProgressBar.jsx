import React from 'react';

const ProgressBar = ({ value }) => {


  const checkPercentage = (num) => {
      let style = "";

      if (num === 0) style = "bg-gray-300";
      else if (num >= 1 && num < 10) style = "bg-violet-100";
      else if (num >= 10 && num < 20) style = "bg-violet-200";
      else if (num >= 20 && num < 30) style = "bg-violet-300";
      else if (num >= 30 && num < 40) style = "bg-violet-400";
      else if (num >= 40 && num < 50) style = "bg-violet-500";
      else if (num >= 50 && num < 60) style = "bg-violet-600";
      else if (num >= 60 && num < 70) style = "bg-violet-700";
      else if (num >= 70 && num < 80) style = "bg-violet-800";
      else if (num >= 80 && num < 90) style = "bg-green-500";
      else if (num >= 90 && num <= 100) style = "bg-green-600";
      else style = "bg-gray-300";

      return style;
  }

  return (
    <div className="relative h-5 bg-gray-400 rounded overflow-hidden w-full">
      <div
        className={`h-full ${checkPercentage(value)} transition-all duration-300`}
        style={{ width: `${value}%` }}
      ></div>
      <span className={`absolute inset-0 flex items-center justify-center font-medium ${value > 50 ? "text-white" : "text-black" }`}>
        {value} / 100
      </span>
    </div>
  );
};

export default ProgressBar;
