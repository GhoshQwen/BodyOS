import React, { useState } from 'react';
import { Plus, Camera, Search, Brain, ChefHat } from 'lucide-react';
import DietRecordForm from '../components/DietRecordForm.jsx';
import DietHistory from '../components/DietHistory.jsx';
import MemoryInsights from '../components/MemoryInsights.jsx';
import SmartRecipe from '../components/SmartRecipe.jsx';
import { apiService } from '../services/api';

const DietRecord = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  const [dietRecords, setDietRecords] = useState([
    {
      id: 1,
      foodName: '燕麦粥',
      amount: '1碗',
      calories: 150,
      mealType: 'breakfast',
      time: '08:30',
      date: '2024-01-20',
      createdAt: '2024-01-20 08:35:22'
    },
    {
      id: 2,
      foodName: '鸡胸肉沙拉',
      amount: '200g',
      calories: 280,
      mealType: 'lunch',
      time: '12:15',
      date: '2024-01-20',
      createdAt: '2024-01-20 12:20:45'
    },
    {
      id: 3,
      foodName: '蒸蛋羹',
      amount: '1份',
      calories: 120,
      mealType: 'dinner',
      time: '18:45',
      date: '2024-01-20',
      createdAt: '2024-01-20 18:50:12'
    },
    {
      id: 4,
      foodName: '苹果',
      amount: '1个',
      calories: 80,
      mealType: 'snack',
      time: '15:30',
      date: '2024-01-20',
      createdAt: '2024-01-20 15:35:33'
    }
  ]);
  
  const handleSaveRecord = (newRecord) => {
    setDietRecords(prev => [{
      ...newRecord,
      createdAt: new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
    }, ...prev]);
  };

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
      
      // 添加到记录列表
      setDietRecords(prev => [newRecord, ...prev]);
      
      // 显示表单以便用户确认和编辑
      setShowForm(true);
    } catch (error) {
      console.error('图片识别失败:', error);
      alert('图片识别失败，请手动添加饮食记录');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🍽️ 饮食记录</h1>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📜 历史记录
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'insights' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🧠 AI洞察
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'recipes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👨‍🍳 智能食谱
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 text-orange-600 p-3 rounded-lg transition-colors cursor-pointer">
              <Camera className="h-5 w-5" />
              <span className="font-medium">拍照识别</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-600 p-3 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="font-medium">添加食物</span>
            </button>
          </div>
        </div>
        
        {activeTab === 'history' && <DietHistory showAll={true} records={dietRecords} setRecords={setDietRecords} />}
        {activeTab === 'insights' && <MemoryInsights />}
        {activeTab === 'recipes' && <SmartRecipe />}
        
        {showForm && (
          <DietRecordForm 
            onClose={() => setShowForm(false)} 
            onSave={handleSaveRecord}
          />
        )}
      </div>
    </div>
  );
};

export default DietRecord;
