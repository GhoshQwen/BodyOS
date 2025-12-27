import React from 'react';
import { ChefHat, Clock, Users, Star } from 'lucide-react';

const DiabetesRecipes = () => {
  const recipes = [
    {
      id: 1,
      name: '低糖燕麦粥',
      ingredients: ['燕麦', '蓝莓', '杏仁奶', '肉桂'],
      calories: 180,
      time: 10,
      difficulty: '简单',
      rating: 4.7,
      image: 'https://nocode.meituan.com/photo/search?keyword=oatmeal,blueberry&width=300&height=200',
      benefits: '富含纤维，有助于控制血糖'
    },
    {
      id: 2,
      name: '蒸蛋羹',
      ingredients: ['鸡蛋', '菠菜', '香菇', '虾仁'],
      calories: 120,
      time: 15,
      difficulty: '简单',
      rating: 4.5,
      image: 'https://nocode.meituan.com/photo/search?keyword=steamed,egg&width=300&height=200',
      benefits: '高蛋白，低糖，适合糖尿病患者'
    },
    {
      id: 3,
      name: '烤三文鱼配蔬菜',
      ingredients: ['三文鱼', '西兰花', '胡萝卜', '橄榄油'],
      calories: 250,
      time: 25,
      difficulty: '中等',
      rating: 4.8,
      image: 'https://nocode.meituan.com/photo/search?keyword=salmon,vegetables&width=300&height=200',
      benefits: '富含Omega-3，有助于心血管健康'
    },
    {
      id: 4,
      name: '藜麦沙拉',
      ingredients: ['藜麦', '黄瓜', '番茄', '橄榄油', '柠檬'],
      calories: 200,
      time: 20,
      difficulty: '简单',
      rating: 4.6,
      image: 'https://nocode.meituan.com/photo/search?keyword=quinoa,salad&width=300&height=200',
      benefits: '低升糖指数，富含蛋白质'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <ChefHat className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">糖尿病食谱推荐</h3>
      </div>
      
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex space-x-4">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-20 h-20 rounded-lg mx-auto object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{recipe.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{recipe.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.time}分钟</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  主要食材：{recipe.ingredients.join('、')}
                </div>
                
                <div className="text-sm font-medium text-green-600 mb-1">
                  {recipe.calories} 卡路里
                </div>
                
                <div className="text-xs text-gray-500">
                  {recipe.benefits}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiabetesRecipes;
