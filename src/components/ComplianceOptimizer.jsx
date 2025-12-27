import React, { useState } from 'react';
import { AlertCircle, Target, Clock, CheckCircle, TrendingDown } from 'lucide-react';
import { apiService } from '../services/api';

const ComplianceOptimizer = () => {
  const [missedDays, setMissedDays] = useState(3);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  const missedReasons = [
    { id: 1, reason: '工作太忙', frequency: 45, selected: false },
    { id: 2, reason: '缺乏动力', frequency: 30, selected: false },
    { id: 3, reason: '身体不适', frequency: 15, selected: false },
    { id: 4, reason: '忘记记录', frequency: 10, selected: false }
  ];
  
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [miniSolutions, setMiniSolutions] = useState([
    {
      id: 1,
      title: '5分钟快速记录',
      description: '只需记录主要餐食，简化记录流程',
      time: '5分钟',
      difficulty: '简单'
    },
    {
      id: 3,
      title: '拍照识别',
      description: '拍照自动识别食物，减少手动输入',
      time: '1分钟',
      difficulty: '简单'
    },
    {
      id: 4,
      title: '设置提醒',
      description: '在固定时间提醒记录饮食',
      time: '持续',
      difficulty: '简单'
    }
  ]);
  
  const toggleReason = (reasonId) => {
    setSelectedReasons(prev => 
      prev.includes(reasonId) 
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };
  
  const applyRecommendedSolution = async () => {
    if (selectedReasons.length === 0) {
      alert('请至少选择一个错过原因');
      return;
    }
    
    setLoading(true);
    try {
      const userData = {
        missedDays,
        currentStreak,
        reasons: selectedReasons.map(id => missedReasons.find(r => r.id === id)?.reason)
      };
      
      const optimization = await apiService.getComplianceOptimization(userData);
      
      if (optimization && optimization.solutions) {
        setMiniSolutions(optimization.solutions);
      }
    } catch (error) {
      console.error('获取优化建议失败:', error);
      // 使用默认建议作为后备
      const defaultSolutions = [
        {
          id: 1,
          title: '5分钟快速记录',
          description: '只需记录主要餐食，简化记录流程',
          time: '5分钟',
          difficulty: '简单'
        },
        {
          id: 3,
          title: '拍照识别',
          description: '拍照自动识别食物，减少手动输入',
          time: '1分钟',
          difficulty: '简单'
        }
      ];
      setMiniSolutions(defaultSolutions);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">⚠️ 依从性优化</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{missedDays}</div>
            <div className="text-sm text-red-800">连续错过天数</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{currentStreak}</div>
            <div className="text-sm text-green-800">当前连续记录</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">分析错过原因</h4>
          <div className="space-y-2">
            {missedReasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                  selectedReasons.includes(reason.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm text-gray-700">{reason.reason}</span>
                <span className="text-xs text-gray-500">{reason.frequency}%</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-orange-800">AI分析结果</span>
          </div>
          <p className="text-sm text-orange-700">
            检测到您连续{missedDays}天未记录，建议采用"最小可行方案"重新建立习惯。
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">🎯 最小可行方案</h3>
        </div>
        
        <div className="space-y-3">
          {miniSolutions.map((solution) => (
            <div key={solution.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{solution.title}</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {solution.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{solution.description}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>预计用时：{solution.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={applyRecommendedSolution}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? '分析中...' : '应用推荐方案'}
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">✅ 重新开始计划</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">今日目标：完成1次饮食记录</span>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">本周目标：完成3次饮食记录</span>
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-800">本月目标：建立稳定记录习惯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceOptimizer;
