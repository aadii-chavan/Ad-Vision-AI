import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MonthlyTargetCard: React.FC = () => {
  const progress = 75.55;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="service-card group">
      <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Target</h3>
      
      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{progress}%</div>
              <div className="text-sm text-green-500 font-medium">+10%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <p className="text-muted-foreground text-sm text-center mb-6 leading-relaxed">
        You earn $3287 today, it's higher than last month. Keep up your good work!
      </p>

      {/* Summary Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Target:</span>
          <div className="flex items-center space-x-1 text-red-500">
            <span className="font-medium">$20K</span>
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Revenue:</span>
          <div className="flex items-center space-x-1 text-green-500">
            <span className="font-medium">$20K</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Today:</span>
          <div className="flex items-center space-x-1 text-green-500">
            <span className="font-medium">$20K</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTargetCard;
