import React, { useState } from 'react';
import { Dumbbell, Clock, Target, Play, CheckCircle, ExternalLink } from 'lucide-react';
import { apiService } from '../services/api';

const PersonalizedWorkout = () => {
  const [userPreferences, setUserPreferences] = useState({
    fitnessLevel: 'beginner',
    availableTime: 30,
    preferredWorkouts: ['cardio', 'strength']
  });

  const [workoutPlans, setWorkoutPlans] = useState([
    {
      id: 1,
      name: '晨间燃脂训练',
      duration: 25,
      intensity: '中等',
      type: '有氧运动',
      exercises: ['开合跳', '高抬腿', '深蹲', '俯卧撑'],
      calories: 180,
      completed: false,
      videoLinks: [
        { platform: 'B站', url: 'https://www.bilibili.com/video/BV1234567890' },
        { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=example1' }
      ]
    },
    {
      id: 2,
      name: '力量塑形训练',
      duration: 35,
      intensity: '高强度',
      type: '力量训练',
      exercises: ['哑铃弯举', '平板支撑', '弓步蹲', '仰卧起坐'],
      calories: 220,
      completed: true,
      videoLinks: [
        { platform: 'B站', url: 'https://www.bilibili.com/video/BV1234567891' },
        { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=example2' }
      ]
    },
    {
      id: 3,
      name: '放松瑜伽',
      duration: 20,
      intensity: '低强度',
      type: '柔韧性训练',
      exercises: ['猫牛式', '下犬式', '战士式', '冥想'],
      calories: 80,
      completed: false,
      videoLinks: [
        { platform: 'B站', url: 'https://www.bilibili.com/video/BV1234567892' },
        { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=example3' }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);

  const fitnessLevels = [
    { value: 'beginner', label: '初学者' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' }
  ];

  const workoutTypes = [
    { value: 'cardio', label: '有氧运动' },
    { value: 'strength', label: '力量训练' },
    { value: 'flexibility', label: '柔韧性训练' },
    { value: 'balance', label: '平衡训练' }
  ];

  const generateNewPlan = async () => {
    setLoading(true);
    try {
      const plan = await apiService.generateWorkoutPlan(userPreferences);
      if (plan && plan.exercises) {
        const newPlan = {
          id: workoutPlans.length + 1,
          name: plan.name || 'AI生成训练',
          duration: plan.duration || userPreferences.availableTime,
          intensity: plan.intensity || '中等',
          type: plan.type || '综合训练',
          exercises: plan.exercises,
          calories: plan.calories || Math.round(userPreferences.availableTime * 6),
          completed: false,
          videoLinks: [
            { platform: 'B站', url: 'https://www.bilibili.com/video/BV1234567893' },
            { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=example4' }
          ]
        };
        setWorkoutPlans([newPlan, ...workoutPlans]);
      }
    } catch (error) {
      console.error('生成运动计划失败:', error);
      // 使用默认计划作为后备
      const defaultPlan = {
        id: workoutPlans.length + 1,
        name: '默认训练计划',
        duration: userPreferences.availableTime,
        intensity: '中等',
        type: '综合训练',
        exercises: ['热身', '主要训练', '拉伸'],
        calories: Math.round(userPreferences.availableTime * 6),
        completed: false,
        videoLinks: [
          { platform: 'B站', url: 'https://www.bilibili.com/video/BV1234567894' },
          { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=example5' }
        ]
      };
      setWorkoutPlans([defaultPlan, ...workoutPlans]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Dumbbell className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">🏋️ 个性化运动计划</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              体能水平
            </label>
            <select
              value={userPreferences.fitnessLevel}
              onChange={(e) => setUserPreferences({...userPreferences, fitnessLevel: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {fitnessLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              可用时间（分钟）
            </label>
            <input
              type="number"
              value={userPreferences.availableTime}
              onChange={(e) => setUserPreferences({...userPreferences, availableTime: parseInt(e.target.value)})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="10"
              max="120"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              偏好运动
            </label>
            <select
              multiple
              value={userPreferences.preferredWorkouts}
              onChange={(e) => setUserPreferences({
                ...userPreferences, 
                preferredWorkouts: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {workoutTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          onClick={generateNewPlan}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? '生成中...' : '生成新计划'}
        </button>
      </div>
      
      <div className="space-y-4">
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{plan.duration}分钟</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{plan.intensity}</span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {plan.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {plan.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-sm font-medium text-gray-700 mb-1">训练动作：</h5>
              <div className="flex flex-wrap gap-2">
                {plan.exercises.map((exercise, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {exercise}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <h5 className="text-sm font-medium text-gray-700 mb-1">教学视频：</h5>
              <div className="flex flex-wrap gap-2">
                {plan.videoLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              预计消耗：{plan.calories} 卡路里
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedWorkout;
