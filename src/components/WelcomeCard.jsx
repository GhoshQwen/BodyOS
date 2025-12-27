import React from 'react';
import { Sparkles, Target } from 'lucide-react';

const WelcomeCard = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? '早上好' : currentHour < 18 ? '下午好' : '晚上好';
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{greeting}！🌟</h1>
          <p className="text-blue-100 mb-4">今天也要加油减重哦！💪</p>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">距离目标还有 5.2kg</span>
          </div>
        </div>
        <div className="bg-white/20 p-4 rounded-full">
          <Sparkles className="h-8 w-8" />
        </div>
      </div>
      
      <div className="mt-4 bg-white/10 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span>本周进度</span>
          <span>75%</span>
        </div>
        <div className="mt-2 bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
