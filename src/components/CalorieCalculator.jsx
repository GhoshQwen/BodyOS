import React, { useState } from 'react';
import { Calculator, User, Ruler, Weight, Calendar, Activity } from 'lucide-react';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    method: 'mifflin'
  });
  
  const [result, setResult] = useState(null);
  
  const activityLevels = [
    { value: 'sedentary', label: '久坐不动', multiplier: 1.2, description: '很少或没有锻炼' },
    { value: 'lightly', label: '轻度活动', multiplier: 1.375, description: '每周锻炼1-3次' },
    { value: 'moderately', label: '中度活动', multiplier: 1.55, description: '每周锻炼4-5次' },
    { value: 'very', label: '非常活跃', multiplier: 1.725, description: '每天锻炼或每周激烈锻炼3-4次' },
    { value: 'extra', label: '额外活跃', multiplier: 1.9, description: '每天非常激烈的锻炼或体力工作' }
  ];
  
  const calculationMethods = [
    { 
      value: 'mifflin', 
      label: 'Mifflin-St Jeor方程', 
      description: '目前被认为是估算卡路里需求的最准确方法',
      mostAccurate: true
    },
    { 
      value: 'harris', 
      label: 'Harris-Benedict方程', 
      description: '经典公式，1984年修订以提高准确性',
      traditional: true
    },
    { 
      value: 'katch', 
      label: 'Katch-McArdle公式', 
      description: '考虑瘦体重，为运动员提供更准确的结果',
      bestForAthletes: true
    }
  ];
  
  const calculateBMR = () => {
    const { gender, age, height, weight, activityLevel, method } = formData;
    
    if (!age || !height || !weight) {
      alert('请填写所有必填字段');
      return;
    }
    
    let bmr;
    
    if (method === 'mifflin') {
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
    } else if (method === 'harris') {
      // Harris-Benedict Equation (Revised)
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
    } else if (method === 'katch') {
      // Katch-McArdle Formula
      // 假设体脂率为20%来计算瘦体重
      const bodyFatPercentage = 20;
      const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
      bmr = 370 + (21.6 * leanBodyMass);
    }
    
    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    const tdee = bmr * selectedActivity.multiplier;
    
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      activityLevel: selectedActivity.label,
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 500),
      method: calculationMethods.find(m => m.value === method).label
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">🧮 卡路里计算器</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              性别
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年龄
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入年龄"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              身高 (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入身高"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              体重 (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入体重"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              计算方法
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {calculationMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {calculationMethods.find(m => m.value === formData.method)?.description}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              活动水平
            </label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label} - {level.description}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={calculateBMR}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            计算卡路里需求
          </button>
          
          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">计算结果</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">基础代谢率 (BMR):</span>
                  <span className="font-medium">{result.bmr} 卡路里/天</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">每日总消耗 (TDEE):</span>
                  <span className="font-medium">{result.tdee} 卡路里/天</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">减重摄入量:</span>
                  <span className="font-medium">{result.weightLoss} 卡路里/天</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">增重摄入量:</span>
                  <span className="font-medium">{result.weightGain} 卡路里/天</span>
                </div>
                <div className="pt-2 border-t border-blue-200">
                  <span className="text-blue-700">计算方法:</span>
                  <span className="font-medium ml-2">{result.method}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">计算公式说明</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Mifflin-St Jeor方程:</strong></p>
          <p>男性: BMR = (10 × 体重kg) + (6.25 × 身高cm) - (5 × 年龄) + 5</p>
          <p>女性: BMR = (10 × 体重kg) + (6.25 × 身高cm) - (5 × 年龄) - 161</p>
          
          <p className="mt-2"><strong>Harris-Benedict方程:</strong></p>
          <p>男性: BMR = 88.362 + (13.397 × 体重kg) + (4.799 × 身高cm) - (5.677 × 年龄)</p>
          <p>女性: BMR = 447.593 + (9.247 × 体重kg) + (3.098 × 身高cm) - (4.330 × 年龄)</p>
          
          <p className="mt-2"><strong>Katch-McArdle公式:</strong></p>
          <p>BMR = 370 + (21.6 × 瘦体重kg)</p>
          <p className="text-xs text-gray-500 mt-1">注: 瘦体重 = 体重 × (1 - 体脂率)</p>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
