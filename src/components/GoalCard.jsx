import React from 'react';
import { Target, TrendingDown, Clock } from 'lucide-react';

const GoalCard = ({ userInfo }) => {
  const weightDiff = userInfo.weight - userInfo.targetWeight;
  const estimatedDays = Math.ceil(weightDiff * 7); // 假设每周减重1kg
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">🎯 减重目标</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-2">
            <TrendingDown className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{weightDiff}kg</div>
          <div className="text-sm text-gray-600">需要减重</div>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
            <Target className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userInfo.targetWeight}kg</div>
          <div className="text-sm text-gray-600">目标体重</div>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{estimatedDays}天</div>
          <div className="text-sm text-gray-600">预估时间</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">进度</span>
          <span className="font-semibold text-blue-600">0%</span>
        </div>
        <div className="mt-2 bg-white rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full h-2 w-0"></div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
