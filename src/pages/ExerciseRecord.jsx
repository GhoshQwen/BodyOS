import React, { useState } from 'react';
import { Plus, Play, Target, Clock, Dumbbell, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import ExerciseRecordForm from '../components/ExerciseRecordForm.jsx';
import ExerciseHistory from '../components/ExerciseHistory.jsx';
import PersonalizedWorkout from '../components/PersonalizedWorkout.jsx';
import { apiService } from '../services/api';

const ExerciseRecord = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [workoutPlans, setWorkoutPlans] = useState([
    {
      id: 1,
      name: '晨间燃脂训练',
      duration: 25,
      intensity: '中等',
      type: '有氧运动',
      exercises: [
        { name: '开合跳', videoUrl: 'https://www.bilibili.com/video/BV1234567890' },
        { name: '高抬腿', videoUrl: 'https://www.bilibili.com/video/BV1234567891' },
        { name: '深蹲', videoUrl: 'https://www.bilibili.com/video/BV1234567892' },
        { name: '俯卧撑', videoUrl: 'https://www.bilibili.com/video/BV1234567893' }
      ],
      calories: 180,
      completed: false
    },
    {
      id: 2,
      name: '力量塑形训练',
      duration: 35,
      intensity: '高强度',
      type: '力量训练',
      exercises: [
        { name: '哑铃弯举', videoUrl: 'https://www.bilibili.com/video/BV1234567894' },
        { name: '平板支撑', videoUrl: 'https://www.bilibili.com/video/BV1234567895' },
        { name: '弓步蹲', videoUrl: 'https://www.bilibili.com/video/BV1234567896' },
        { name: '仰卧起坐', videoUrl: 'https://www.bilibili.com/video/BV1234567897' }
      ],
      calories: 220,
      completed: true
    },
    {
      id: 3,
      name: '放松瑜伽',
      duration: 20,
      intensity: '低强度',
      type: '柔韧性训练',
      exercises: [
        { name: '猫牛式', videoUrl: 'https://www.bilibili.com/video/BV1234567898' },
        { name: '下犬式', videoUrl: 'https://www.bilibili.com/video/BV1234567899' },
        { name: '战士式', videoUrl: 'https://www.bilibili.com/video/BV1234567900' },
        { name: '冥想', videoUrl: 'https://www.bilibili.com/video/BV1234567901' }
      ],
      calories: 80,
      completed: false
    }
  ]);
  const [loading, setLoading] = useState(false);

  const generateNewPlan = async () => {
    setLoading(true);
    try {
      const userPreferences = {
        fitnessLevel: 'intermediate',
        availableTime: 30,
        preferredWorkouts: ['cardio', 'strength']
      };
      
      const plan = await apiService.generateWorkoutPlan(userPreferences);
      if (plan && plan.exercises) {
        const newPlan = {
          id: workoutPlans.length + 1,
          name: plan.name || 'AI生成训练',
          duration: plan.duration || userPreferences.availableTime,
          intensity: plan.intensity || '中等',
          type: plan.type || '综合训练',
          exercises: plan.exercises.map(exercise => ({
            name: exercise,
            videoUrl: 'https://www.bilibili.com/video/BV1234567902' // 默认视频链接
          })),
          calories: plan.calories || Math.round(userPreferences.availableTime * 6),
          completed: false
        };
        setWorkoutPlans([newPlan, ...workoutPlans]);
      }
    } catch (error) {
      console.error('生成运动计划失败:', error);
      // 使用默认计划作为后备
      const defaultPlan = {
        id: workoutPlans.length + 1,
        name: '默认训练计划',
        duration: 30,
        intensity: '中等',
        type: '综合训练',
        exercises: [
          { name: '热身', videoUrl: 'https://www.bilibili.com/video/BV1234567903' },
          { name: '主要训练', videoUrl: 'https://www.bilibili.com/video/BV1234567904' },
          { name: '拉伸', videoUrl: 'https://www.bilibili.com/video/BV1234567905' }
        ],
        calories: 180,
        completed: false
      };
      setWorkoutPlans([defaultPlan, ...workoutPlans]);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = (planId) => {
    setWorkoutPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🏋️ 运动记录</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'today' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📅 今日运动
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'plan' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 运动计划
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📜 历史记录
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">45</div>
              <div className="text-sm text-gray-600">运动分钟</div>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">320</div>
              <div className="text-sm text-gray-600">消耗卡路里</div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">运动项目</div>
            </div>
          </div>
        </div>
        
        {activeTab === 'today' && <ExerciseHistory />}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">🏋️ 个性化运动计划</h3>
                <button 
                  onClick={generateNewPlan}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span>{loading ? '生成中...' : '生成新计划'}</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {workoutPlans.map((plan) => (
                  <div key={plan.id} className="bg-gray-50 rounded-lg p-4 relative">
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
                          <div className="bg-green-600 text-white p-2 rounded-full">
                            <Play className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="bg-gray-300 text-gray-600 p-2 rounded-full">
                            <Play className="h-4 w-4" />
                          </div>
                        )}
                        <button 
                          onClick={() => deletePlan(plan.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">训练动作：</h5>
                      <div className="space-y-2">
                        {plan.exercises.map((exercise, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                            <span className="text-sm text-gray-700">{exercise.name}</span>
                            <a 
                              href={exercise.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
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
          </div>
        )}
        {activeTab === 'history' && <ExerciseHistory showAll={true} />}
        
        {showForm && (
          <ExerciseRecordForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default ExerciseRecord;
