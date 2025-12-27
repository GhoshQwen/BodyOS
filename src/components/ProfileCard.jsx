import React from 'react';
import { User, Calendar, Ruler, Weight } from 'lucide-react';

const ProfileCard = ({ userInfo }) => {
  const bmi = (userInfo.weight / Math.pow(userInfo.height / 100, 2)).toFixed(1);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img 
            src={userInfo.avatar || "https://nocode.meituan.com/photo/search?keyword=person&width=100&height=100&source=meituan"} 
            alt="用户头像" 
            className="w-16 h-16 rounded-full mx-auto object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1 rounded-full">
            <User className="h-3 w-3 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{userInfo.name}</h2>
          <p className="text-gray-600">{userInfo.age}岁 · BMI {bmi}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Ruler className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600">身高</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">{userInfo.height}cm</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Weight className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">体重</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">{userInfo.weight}kg</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-600">加入时间：{userInfo.joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
