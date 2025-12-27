import React from 'react';
import { Camera, Plus } from 'lucide-react';
import { apiService } from '../services/api';

const QuickActions = () => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 调用图片识别API
      const result = await apiService.analyzeFoodImage(formData);
      
      // 创建新的饮食记录
      const newRecord = {
        id: Date.now(),
        foodName: result.foodName || '识别食物',
        amount: result.amount || '1份',
        calories: result.calories || 0,
        mealType: 'snack', // 默认为加餐
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        date: '2024-01-20',
        createdAt: new Date().toLocaleString('zh-CN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        })
      };
      
      // 这里应该将记录添加到饮食记录页面
      // 由于无法直接修改其他页面的状态，这里只是提示用户
      alert(`识别成功！食物: ${newRecord.foodName}, 分量: ${newRecord.amount}, 卡路里: ${newRecord.calories}`);
      
    } catch (error) {
      console.error('图片识别失败:', error);
      alert('图片识别失败，请手动添加饮食记录');
    }
  };

  const handleManualAdd = () => {
    // 跳转到饮食记录页面并打开添加表单
    window.location.hash = '#/diet';
    // 由于无法直接控制其他页面的状态，这里只是提示用户
    alert('请手动添加饮食记录');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">⚡ 快速记录</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 text-orange-600 p-3 rounded-lg transition-colors cursor-pointer">
          <Camera className="h-5 w-5" />
          <span className="font-medium">拍照记录</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        
        <button 
          onClick={handleManualAdd}
          className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 p-3 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">手动添加</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
