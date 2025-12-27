import React, { useState } from 'react';
import { ChefHat, Clock, Users, Star, RefreshCw, CheckCircle, Plus, X } from 'lucide-react';
import { apiService } from '../services/api';
import { useForm } from 'react-hook-form';

const SmartRecipe = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [diabetesMode, setDiabetesMode] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [customOptions, setCustomOptions] = useState({});
  
  const foodCategories = {
    protein: {
      name: '🥩 蛋白质',
      items: ['鸡胸肉', '三文鱼', '鸡蛋', '豆腐', '瘦牛肉', '虾仁']
    },
    vegetables: {
      name: '🥬 蔬菜',
      items: ['西兰花', '胡萝卜', '番茄', '黄瓜', '菠菜', '芦笋']
    },
    grains: {
      name: '🍚 主食',
      items: ['燕麦', '糙米', '全麦面包', '藜麦', '红薯', '玉米']
    },
    dairy: {
      name: '🥛 乳制品',
      items: ['酸奶', '牛奶', '奶酪', '低脂酸奶']
    },
    fruits: {
      name: '🍎 水果',
      items: ['苹果', '香蕉', '蓝莓', '橙子', '草莓', '猕猴桃']
    },
    nuts: {
      name: '🥜 坚果',
      items: ['杏仁', '核桃', '腰果', '开心果']
    }
  };
  
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: '高蛋白早餐碗',
      ingredients: ['燕麦', '鸡蛋', '坚果'],
      calories: 320,
      time: 15,
      difficulty: '简单',
      rating: 4.8,
      image: 'https://nocode.meituan.com/photo/search?keyword=healthy,breakfast&width=300&height=200'
    },
    {
      id: 2,
      name: '三文鱼沙拉',
      ingredients: ['三文鱼', '西兰花', '番茄'],
      calories: 280,
      time: 20,
      difficulty: '中等',
      rating: 4.6,
      image: 'https://nocode.meituan.com/photo/search?keyword=salmon,salad&width=300&height=200'
    }
  ]);

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      stapleFoods: [],
      beanProducts: '',
      meatPreferences: [],
      cookingMethods: [],
      vegetableTypes: [],
      fruitHabits: '',
      mealFrequency: '',
      tastePreferences: [],
      dietaryRestrictions: [],
      bloodSugarControl: '',
      otherNotes: ''
    }
  });

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addCustomOption = (category, value) => {
    if (!value.trim()) return;
    
    setCustomOptions(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), value.trim()]
    }));
    
    // 重置输入框
    setValue(`custom_${category}`, '');
  };

  const removeCustomOption = (category, value) => {
    setCustomOptions(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  const generateNewRecipe = async (data) => {
    if (selectedIngredients.length === 0 && !diabetesMode) {
      alert('请至少选择一种食材');
      return;
    }
    
    setLoading(true);
    try {
      const preferences = {
        ingredients: selectedIngredients,
        dietaryRestrictions: diabetesMode ? ['diabetes'] : [],
        cuisineType: 'healthy',
        questionnaire: diabetesMode ? data : null
      };
      
      // 调用DeepSeek API生成食谱
      const newRecipe = await apiService.generateRecipe(preferences);
      
      if (newRecipe) {
        const recipe = {
          id: recipes.length + 1,
          name: newRecipe.name || 'AI推荐食谱',
          ingredients: newRecipe.ingredients || selectedIngredients,
          calories: newRecipe.calories || 300,
          time: newRecipe.cookingTime || 20,
          difficulty: newRecipe.difficulty || '简单',
          rating: newRecipe.rating || 4.5,
          image: newRecipe.image || 'https://nocode.meituan.com/photo/search?keyword=healthy,food&width=300&height=200',
          instructions: newRecipe.instructions || []
        };
        
        // 覆盖原有食谱
        setRecipes([recipe]);
      }
    } catch (error) {
      console.error('生成食谱失败:', error);
      // 使用默认食谱作为后备
      const defaultRecipe = {
        id: recipes.length + 1,
        name: diabetesMode ? '低糖健康食谱' : '默认健康食谱',
        ingredients: selectedIngredients,
        calories: diabetesMode ? 250 : 300,
        time: 20,
        difficulty: '简单',
        rating: 4.5,
        image: 'https://nocode.meituan.com/photo/search?keyword=healthy,food&width=300&height=200'
      };
      setRecipes([defaultRecipe]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <ChefHat className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">👨‍🍳 智能食谱推荐</h3>
        </div>
        
        {/* 糖尿病食谱选项 */}
        <div className="mb-4 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={diabetesMode}
                onChange={(e) => setDiabetesMode(e.target.checked)}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-red-800 font-medium">🥗 糖尿病食谱 (低糖饮食)</span>
            </label>
            {diabetesMode && (
              <button
                onClick={() => setShowQuestionnaire(!showQuestionnaire)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                食谱问卷！
              </button>
            )}
          </div>
        </div>
        
        {/* 糖尿病食谱问卷 */}
        {diabetesMode && showQuestionnaire && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4">糖尿病人饮食倾向测试</h4>
            
            <form onSubmit={handleSubmit(generateNewRecipe)} className="space-y-6">
              {/* 饮食习惯偏好 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">饮食习惯偏好</h5>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您偏好的主食类型（可多选）
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['米饭', '面食', '粗粮（燕麦、藜麦等）', '薯类（红薯、山药等）'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('stapleFoods')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="其他"
                        {...register('stapleFoods')}
                        className="mr-2"
                      />
                      <span className="text-sm">其他：</span>
                      <input
                        type="text"
                        {...register('custom_stapleFoods')}
                        className="ml-1 px-2 py-1 border rounded text-sm"
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addCustomOption('stapleFoods', e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {customOptions.stapleFoods && customOptions.stapleFoods.map(item => (
                    <div key={item} className="flex items-center mt-1">
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomOption('stapleFoods', item)}
                        className="ml-2 text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您对豆制品的接受程度
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['经常食用', '偶尔食用', '很少食用', '完全不食用'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="radio"
                          value={item}
                          {...register('beanProducts')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 蛋白质来源偏好 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">蛋白质来源偏好</h5>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您偏好的肉类选择（可多选）
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['鸡肉', '鸭肉', '鱼肉', '虾类', '牛肉', '猪肉'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('meatPreferences')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="其他"
                        {...register('meatPreferences')}
                        className="mr-2"
                      />
                      <span className="text-sm">其他：</span>
                      <input
                        type="text"
                        {...register('custom_meatPreferences')}
                        className="ml-1 px-2 py-1 border rounded text-sm"
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addCustomOption('meatPreferences', e.target.value);
                          }
                        }}
                      />
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="我是素食主义者"
                        {...register('meatPreferences')}
                        className="mr-2"
                      />
                      <span className="text-sm">我是素食主义者</span>
                    </label>
                  </div>
                  {customOptions.meatPreferences && customOptions.meatPreferences.map(item => (
                    <div key={item} className="flex items-center mt-1">
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomOption('meatPreferences', item)}
                        className="ml-2 text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您偏好的烹饪方式（可多选）
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['清蒸', '水煮', '快炒', '炖煮', '烤制', '凉拌'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('cookingMethods')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="其他"
                        {...register('cookingMethods')}
                        className="mr-2"
                      />
                      <span className="text-sm">其他：</span>
                      <input
                        type="text"
                        {...register('custom_cookingMethods')}
                        className="ml-1 px-2 py-1 border rounded text-sm"
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addCustomOption('cookingMethods', e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {customOptions.cookingMethods && customOptions.cookingMethods.map(item => (
                    <div key={item} className="flex items-center mt-1">
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomOption('cookingMethods', item)}
                        className="ml-2 text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 蔬菜水果偏好 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">蔬菜水果偏好</h5>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您经常食用的蔬菜类型（可多选）
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['叶菜类（菠菜、生菜等）', '根茎类（胡萝卜、白萝卜等）', '瓜果类（黄瓜、西红柿等）', '菌菇类（香菇、金针菇等）', '豆类（豌豆、豆角等）'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('vegetableTypes')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="其他"
                        {...register('vegetableTypes')}
                        className="mr-2"
                      />
                      <span className="text-sm">其他：</span>
                      <input
                        type="text"
                        {...register('custom_vegetableTypes')}
                        className="ml-1 px-2 py-1 border rounded text-sm"
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addCustomOption('vegetableTypes', e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {customOptions.vegetableTypes && customOptions.vegetableTypes.map(item => (
                    <div key={item} className="flex items-center mt-1">
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomOption('vegetableTypes', item)}
                        className="ml-2 text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您对水果的食用习惯
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['每天食用', '每周3-4次', '偶尔食用', '基本不食用'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="radio"
                          value={item}
                          {...register('fruitHabits')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 饮食习惯 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">饮食习惯</h5>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您的用餐频率
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['一日三餐', '少食多餐（5-6次/天）', '不规律'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="radio"
                          value={item}
                          {...register('mealFrequency')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您的口味偏好
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['清淡', '适中', '偏咸', '偏甜（需特别注意）', '偏辣'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('tastePreferences')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 特殊情况 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">特殊情况</h5>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您是否有其他饮食限制或过敏？
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['乳糖不耐受', '海鲜过敏', '坚果过敏', '麸质过敏', '无'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="checkbox"
                          value={item}
                          {...register('dietaryRestrictions')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="其他"
                        {...register('dietaryRestrictions')}
                        className="mr-2"
                      />
                      <span className="text-sm">其他：</span>
                      <input
                        type="text"
                        {...register('custom_dietaryRestrictions')}
                        className="ml-1 px-2 py-1 border rounded text-sm"
                        onBlur={(e) => {
                          if (e.target.value.trim()) {
                            addCustomOption('dietaryRestrictions', e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {customOptions.dietaryRestrictions && customOptions.dietaryRestrictions.map(item => (
                    <div key={item} className="flex items-center mt-1">
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomOption('dietaryRestrictions', item)}
                        className="ml-2 text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    您的血糖控制目标
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['严格控制', '一般控制', '维持现状'].map(item => (
                      <label key={item} className="flex items-center">
                        <input
                          type="radio"
                          value={item}
                          {...register('bloodSugarControl')}
                          className="mr-2"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 补充说明 */}
              <div>
                <h5 className="font-medium text-gray-800 mb-2">补充说明</h5>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    其他需要说明的情况（选填）
                  </label>
                  <textarea
                    {...register('otherNotes')}
                    rows="3"
                    className="w-full p-2 border rounded"
                    placeholder="（请在此填写任何其他饮食需求、偏好或特殊情况）"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span>{loading ? '生成中...' : '生成个性化食谱'}</span>
              </button>
            </form>
          </div>
        )}
        
        {/* 食物分类选择 */}
        <div className="space-y-4 mb-4">
          {Object.entries(foodCategories).map(([categoryKey, category]) => (
            <div key={categoryKey}>
              <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
                {/* 自定义选项 */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      const value = prompt(`请输入自定义${category.name.replace(/[🥩🥬🍚🥛🍎🥜\s]/g, '')}选项:`);
                      if (value && value.trim()) {
                        addCustomOption(categoryKey, value.trim());
                      }
                    }}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    自定义
                  </button>
                </div>
                {/* 显示自定义选项 */}
                {customOptions[categoryKey] && customOptions[categoryKey].map(item => (
                  <div key={item} className="flex items-center">
                    <button
                      onClick={() => toggleIngredient(item)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedIngredients.includes(item)
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {item}
                    </button>
                    <button
                      onClick={() => removeCustomOption(categoryKey, item)}
                      className="ml-1 text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {!showQuestionnaire && (
          <button 
            onClick={() => handleSubmit(generateNewRecipe)()}
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>{loading ? '生成中...' : '生成新食谱'}</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl p-4 shadow-sm">
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
                
                <div className="text-sm font-medium text-orange-600">
                  {recipe.calories} 卡路里
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecipe;
