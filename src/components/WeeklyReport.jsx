import React from 'react';
import { Calendar, TrendingUp, Award, AlertCircle } from 'lucide-react';

const WeeklyReport = () => {
  const reportData = {
    week: '2024年第3周',
    totalWeightLoss: 0.8,
    avgDailyCalories: 1680,
    totalExerciseTime: 180,
    achievements: ['连续7天记录', '运动达人', '减重先锋'],
    improvements: ['蛋白质摄入不足', '运动强度可提升'],
    suggestions: [
      '增加蛋白质摄入，每餐包含优质蛋白',
      '尝试增加高强度间歇训练',
      '保持充足的睡眠时间'
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">📅 {reportData.week} 减重报告</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">-{reportData.totalWeightLoss}kg</div>
            <div className="text-sm text-blue-800">本周减重</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{reportData.avgDailyCalories}</div>
            <div className="text-sm text-green-800">日均摄入</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">🏆 本周成就</h3>
        </div>
        <div className="space-y-2">
          {reportData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-800">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">⚠️ 需要改进</h3>
        </div>
        <div className="space-y-2">
          {reportData.improvements.map((improvement, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-orange-800">{improvement}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">💡 AI建议</h3>
        </div>
        <div className="space-y-3">
          {reportData.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span className="text-green-800">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
