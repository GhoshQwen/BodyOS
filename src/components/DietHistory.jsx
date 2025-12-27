import React, { useState } from 'react';
import { Clock, Flame, Edit, Trash2 } from 'lucide-react';

const DietHistory = ({ showAll = false, records = [], setRecords }) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [editForm, setEditForm] = useState({
    foodName: '',
    amount: '',
    calories: '',
    mealType: '',
    time: ''
  });
  
  const mealTypeLabels = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐'
  };
  
  const mealTypeColors = {
    breakfast: 'bg-yellow-100 text-yellow-800',
    lunch: 'bg-orange-100 text-orange-800',
    dinner: 'bg-blue-100 text-blue-800',
    snack: 'bg-green-100 text-green-800'
  };
  
  const displayRecords = showAll ? records : records.filter(record => record.date === '2024-01-20');
  
  const handleDelete = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };
  
  const handleEdit = (record) => {
    setEditingRecord(record.id);
    setEditForm({
      foodName: record.foodName,
      amount: record.amount,
      calories: record.calories.toString(),
      mealType: record.mealType,
      time: record.time
    });
  };
  
  const handleSaveEdit = () => {
    setRecords(prev => 
      prev.map(record => 
        record.id === editingRecord 
          ? { 
              ...record, 
              foodName: editForm.foodName,
              amount: editForm.amount,
              calories: parseInt(editForm.calories),
              mealType: editForm.mealType,
              time: editForm.time
            }
          : record
      )
    );
    setEditingRecord(null);
  };
  
  const handleCancelEdit = () => {
    setEditingRecord(null);
  };
  
  return (
    <div className="space-y-4">
      {displayRecords.map((record) => (
        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
          {editingRecord === record.id ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  食物名称
                </label>
                <input
                  type="text"
                  value={editForm.foodName}
                  onChange={(e) => setEditForm({...editForm, foodName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分量
                  </label>
                  <input
                    type="text"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    卡路里
                  </label>
                  <input
                    type="number"
                    value={editForm.calories}
                    onChange={(e) => setEditForm({...editForm, calories: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    餐次
                  </label>
                  <select
                    value={editForm.mealType}
                    onChange={(e) => setEditForm({...editForm, mealType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="breakfast">早餐</option>
                    <option value="lunch">午餐</option>
                    <option value="dinner">晚餐</option>
                    <option value="snack">加餐</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    时间
                  </label>
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${mealTypeColors[record.mealType]}`}>
                    {mealTypeLabels[record.mealType]}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{record.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-gray-400 hover:text-blue-600"
                    onClick={() => handleEdit(record)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-600"
                    onClick={() => handleDelete(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{record.foodName}</h3>
                  <p className="text-sm text-gray-600">{record.amount}</p>
                  {record.createdAt && (
                    <p className="text-xs text-gray-500 mt-1">记录时间: {record.createdAt}</p>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-orange-600">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">{record.calories} 卡路里</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      
      {displayRecords.length === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="text-gray-400 mb-2">
            <Clock className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600">
            {showAll ? '暂无饮食记录' : '今日暂无饮食记录'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DietHistory;
