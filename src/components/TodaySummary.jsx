import React from 'react';
import { Flame, Zap, Clock } from 'lucide-react';

const TodaySummary = ({ caloriesIn = 0, caloriesOut = 0, exerciseMinutes = 0 }) => {
  const netCalories = caloriesIn - caloriesOut;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 今日摘要</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-2">
            <Flame className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{caloriesIn}</div>
          <div className="text-sm text-gray-600">摄入卡路里</div>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
            <Zap className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{caloriesOut}</div>
          <div className="text-sm text-gray-600">消耗卡路里</div>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{exerciseMinutes}</div>
          <div className="text-sm text-gray-600">运动分钟</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">净卡路里</span>
          <span className={`font-semibold ${netCalories > 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {netCalories} 卡路里
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodaySummary;
