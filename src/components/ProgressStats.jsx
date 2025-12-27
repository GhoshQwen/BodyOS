import React from 'react';
import { Flame, Zap, Target, Calendar } from 'lucide-react';

const ProgressStats = () => {
  const stats = [
    {
      title: '本周摄入',
      value: '8,240',
      unit: '卡路里',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: '本周消耗',
      value: '2,180',
      unit: '卡路里',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '运动时长',
      value: '180',
      unit: '分钟',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: '坚持天数',
      value: '15',
      unit: '天',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 本周统计</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`${stat.bgColor} p-3 rounded-full w-fit mx-auto mb-2`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.unit}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI分析建议</h3>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">良好习惯</span>
            </div>
            <p className="text-sm text-green-700">您的运动频率很稳定，继续保持！</p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">改进建议</span>
            </div>
            <p className="text-sm text-yellow-700">建议增加蛋白质摄入，有助于肌肉恢复。</p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">目标提醒</span>
            </div>
            <p className="text-sm text-blue-700">距离目标还有2.5kg，预计还需3周时间。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
