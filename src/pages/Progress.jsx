import React, { useState, useEffect } from 'react';
import { TrendingDown, Calendar, Award, BarChart3, Users, AlertCircle, Activity, Heart, Zap } from 'lucide-react';
import WeightChart from '../components/WeightChart.jsx';
import ProgressStats from '../components/ProgressStats.jsx';
import WeeklyReport from '../components/WeeklyReport.jsx';
import SocialAdapter from '../components/SocialAdapter.jsx';
import ComplianceOptimizer from '../components/ComplianceOptimizer.jsx';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [healthMetrics, setHealthMetrics] = useState({
    bmi: 0,
    bodyFat: 0,
    muscleMass: 0,
    bmr: 0,
    weightLoss: 0,
    exerciseDays: 0,
    achievements: 0
  });

  useEffect(() => {
    // 计算健康指标
    const calculateHealthMetrics = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const { height = 170, weight = 75, age = 28 } = userInfo;
      
      // BMI计算
      const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
      
      // 体脂率计算 (使用BMI估算)
      const bodyFat = (1.2 * bmi + 0.23 * age - 16.2).toFixed(1);
      
      // 肌肉量计算 (估算)
      const muscleMass = (weight * 0.4).toFixed(1);
      
      // 基础代谢率计算 (Mifflin-St Jeor方程)
      const bmr = (10 * weight + 6.25 * height - 5 * age + 5).toFixed(0);
      
      setHealthMetrics({
        bmi,
        bodyFat,
        muscleMass,
        bmr,
        weightLoss: 2.5, // 示例数据
        exerciseDays: 15, // 示例数据
        achievements: 3 // 示例数据
      });
    };

    calculateHealthMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">📈 减重进度</h1>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <BarChart3 className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 总览
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'chart' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📉 图表
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'report' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 报告
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'social' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👥 社交适应
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'compliance' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⚠️ 依从性优化
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{healthMetrics.weightLoss}kg</div>
              <div className="text-sm text-gray-600">已减重</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{healthMetrics.exerciseDays}</div>
              <div className="text-sm text-gray-600">坚持天数</div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 p-3 rounded-full w-fit mx-auto mb-2">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{healthMetrics.achievements}</div>
              <div className="text-sm text-gray-600">获得成就</div>
            </div>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 健康指标</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{healthMetrics.bmi}</div>
                  <div className="text-sm text-blue-800">BMI</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{healthMetrics.bodyFat}%</div>
                  <div className="text-sm text-green-800">体脂率</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{healthMetrics.muscleMass}kg</div>
                  <div className="text-sm text-purple-800">肌肉量</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{healthMetrics.bmr}</div>
                  <div className="text-sm text-orange-800">基础代谢</div>
                </div>
              </div>
            </div>
            <ProgressStats />
          </div>
        )}
        {activeTab === 'chart' && <WeightChart />}
        {activeTab === 'report' && <WeeklyReport />}
        {activeTab === 'social' && <SocialAdapter />}
        {activeTab === 'compliance' && <ComplianceOptimizer />}
      </div>
    </div>
  );
};

export default Progress;
