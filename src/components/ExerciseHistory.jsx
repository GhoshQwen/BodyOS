import React, { useState } from 'react';
import { Clock, Zap, Edit, Trash2, Target } from 'lucide-react';

const ExerciseHistory = ({ showAll = false }) => {
  const [exerciseRecords, setExerciseRecords] = useState([
    {
      id: 1,
      exerciseName: '晨跑',
      duration: 30,
      intensity: 'medium',
      calories: 280,
      notes: '今天状态不错，跑了3公里',
      date: '2024-01-20',
      time: '07:30'
    },
    {
      id: 2,
      exerciseName: '力量训练',
      duration: 45,
      intensity: 'high',
      calories: 320,
      notes: '胸肌训练，感觉很有效果',
      date: '2024-01-20',
      time: '18:00'
    },
    {
      id: 3,
      exerciseName: '瑜伽',
      duration: 20,
      intensity: 'low',
      calories: 80,
      notes: '放松身心，缓解压力',
      date: '2024-01-19',
      time: '20:00'
    }
  ]);
  
  const intensityLabels = {
    low: '低强度',
    medium: '中等强度',
    high: '高强度'
  };
  
  const intensityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };
  
  const todayRecords = exerciseRecords.filter(record => record.date === '2024-01-20');
  const displayRecords = showAll ? exerciseRecords : todayRecords;
  
  const handleDelete = (id) => {
    setExerciseRecords(prev => prev.filter(record => record.id !== id));
  };
  
  return (
    <div className="space-y-4">
      {displayRecords.map((record) => (
        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${intensityColors[record.intensity]}`}>
                {intensityLabels[record.intensity]}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{record.time}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-blue-600">
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
          
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{record.exerciseName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{record.duration}分钟</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>{record.calories}卡路里</span>
                </div>
              </div>
            </div>
          </div>
          
          {record.notes && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{record.notes}</p>
            </div>
          )}
        </div>
      ))}
      
      {displayRecords.length === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="text-gray-400 mb-2">
            <Target className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600">
            {showAll ? '暂无运动记录' : '今日暂无运动记录'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseHistory;
