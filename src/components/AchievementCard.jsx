import React from 'react';
import { Award, Star, Trophy, Medal, Target, Calendar, Zap, Flame, Heart, Dumbbell } from 'lucide-react';

const AchievementCard = () => {
  const achievements = [
    { id: 1, name: '初次记录', description: '完成第一次饮食记录', icon: Star, earned: true, color: 'bg-yellow-500' },
    { id: 2, name: '坚持一周', description: '连续7天记录饮食', icon: Medal, earned: true, color: 'bg-blue-500' },
    { id: 3, name: '运动达人', description: '累计运动10小时', icon: Trophy, earned: false, color: 'bg-green-500' },
    { id: 4, name: '减重先锋', description: '成功减重5kg', icon: Award, earned: false, color: 'bg-purple-500' },
    { id: 5, name: '卡路里猎手', description: '单日消耗500卡路里', icon: Flame, earned: true, color: 'bg-red-500' },
    { id: 6, name: '完美一周', description: '一周内完成所有运动计划', icon: Target, earned: false, color: 'bg-indigo-500' },
    { id: 7, name: '早起鸟', description: '连续7天早晨运动', icon: Calendar, earned: true, color: 'bg-orange-500' },
    { id: 8, name: '力量之王', description: '完成100次力量训练', icon: Dumbbell, earned: false, color: 'bg-gray-700' },
    { id: 9, name: '耐力之星', description: '单次运动超过2小时', icon: Zap, earned: false, color: 'bg-yellow-400' },
    { id: 10, name: '健康之心', description: '连续30天记录饮食', icon: Heart, earned: true, color: 'bg-pink-500' }
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Award className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">🏆 成就系统</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
                achievement.earned 
                  ? 'border-yellow-200 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* 徽章背景 */}
              <div className={`absolute inset-0 ${achievement.color} opacity-10`}></div>
              
              <div className="flex items-center space-x-2 mb-2 relative z-10">
                <div className={`p-2 rounded-full ${achievement.color} bg-opacity-20`}>
                  <Icon className={`h-5 w-5 ${
                    achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                  }`} />
                </div>
                <span className={`font-medium ${
                  achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                }`}>
                  {achievement.name}
                </span>
              </div>
              <p className={`text-sm relative z-10 ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
              
              {/* 立体效果 */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${achievement.color}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementCard;
