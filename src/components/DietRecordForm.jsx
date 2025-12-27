import React, { useState } from 'react';
import { X, Save, Clock, Utensils, Brain } from 'lucide-react';
import { apiService } from '../services/api';

const DietRecordForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    amount: '',
    calories: '',
    mealType: 'breakfast',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  });
  
  const [loading, setLoading] = useState(false);
  
  const mealTypes = [
    { value: 'breakfast', label: '早餐' },
    { value: 'lunch', label: '午餐' },
    { value: 'dinner', label: '晚餐' },
    { value: 'snack', label: '加餐' }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 调用父组件的保存函数
    onSave({
      ...formData,
      id: Date.now(), // 使用时间戳作为唯一ID
      calories: parseInt(formData.calories),
      date: '2024-01-20' // 使用当前日期
    });
    onClose();
  };
  
  const estimateCalories = async () => {
    if (!formData.foodName.trim()) {
      alert('请输入食物名称');
      return;
    }
    
    setLoading(true);
    try {
      // 使用AI分析食物
      const analysis = await apiService.analyzeFoodImage(formData.foodName);
      if (analysis && analysis.calories) {
        setFormData({...formData, calories: analysis.calories.toString()});
      } else {
        // 后备方案：使用本地估算
        const foodCalories = {
          '米饭': 130,
          '面条': 110,
          '鸡蛋': 70,
          '鸡胸肉': 165,
          '牛肉': 250,
          '鱼': 200,
          '蔬菜': 25,
          '水果': 50,
          '面包': 80,
          '牛奶': 150
        };
        
        const foodName = formData.foodName.toLowerCase();
        const amount = parseFloat(formData.amount) || 100;
        
        // 查找匹配的食物
        const matchedFood = Object.keys(foodCalories).find(food => 
          foodName.includes(food) || foodName.includes(food.toLowerCase())
        );
        
        if (matchedFood) {
          const baseCalories = foodCalories[matchedFood];
          const estimatedCalories = Math.round((baseCalories * amount) / 100);
          setFormData({...formData, calories: estimatedCalories.toString()});
        } else {
          // 默认估算
          const estimatedCalories = Math.round(amount * 1.2);
          setFormData({...formData, calories: estimatedCalories.toString()});
        }
      }
    } catch (error) {
      console.error('AI分析失败:', error);
      // 使用本地估算作为后备
      const foodCalories = {
        '米饭': 130,
        '面条': 110,
        '鸡蛋': 70,
        '鸡胸肉': 165,
        '牛肉': 250,
        '鱼': 200,
        '蔬菜': 25,
        '水果': 50,
        '面包': 80,
        '牛奶': 150
      };
      
      const foodName = formData.foodName.toLowerCase();
      const amount = parseFloat(formData.amount) || 100;
      
      // 查找匹配的食物
      const matchedFood = Object.keys(foodCalories).find(food => 
        foodName.includes(food) || foodName.includes(food.toLowerCase())
      );
      
      if (matchedFood) {
        const baseCalories = foodCalories[matchedFood];
        const estimatedCalories = Math.round((baseCalories * amount) / 100);
        setFormData({...formData, calories: estimatedCalories.toString()});
      } else {
        // 默认估算
        const estimatedCalories = Math.round(amount * 1.2);
        setFormData({...formData, calories: estimatedCalories.toString()});
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">添加饮食记录</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              食物名称
            </label>
            <input
              type="text"
              value={formData.foodName}
              onChange={(e) => setFormData({...formData, foodName: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入食物名称"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                分量
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="如：100g"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                卡路里
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="卡路里"
                  required
                />
                <button
                  type="button"
                  onClick={estimateCalories}
                  disabled={loading}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Brain className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              餐次
            </label>
            <select
              value={formData.mealType}
              onChange={(e) => setFormData({...formData, mealType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {mealTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              时间
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>保存</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietRecordForm;
