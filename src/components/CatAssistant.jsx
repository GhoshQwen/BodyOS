import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CatAssistant = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleCatClick = () => {
    setIsShaking(true);
    // 播放猫叫声
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-domestic-cat-hungry-meow-45.mp3');
    audio.play();
    
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={isShaking ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        onClick={handleCatClick}
        className="cursor-pointer"
      >
        <img 
          src="https://s3plus.meituan.net/nocode-external/nocode_image/default/jimeng-2025-12-26-9557-帮我设计一个简约风格的的动漫小猫作为减肥小助手，再简约一点-5og89on48ln21ppv0d064zieke1mhe.png" 
          alt="减肥小助手" 
          className="w-32 h-32 mx-auto object-cover"
        />
      </motion.div>
      <div className="mt-2 bg-white rounded-lg p-2 shadow-sm">
        <p className="text-sm text-gray-700">加油！今天也要坚持哦~ 🐱</p>
      </div>
    </div>
  );
};

export default CatAssistant;
