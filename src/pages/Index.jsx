import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Utensils, Dumbbell, TrendingUp, Target, Calendar, MessageCircle, Camera, Bluetooth } from 'lucide-react';
import WelcomeCard from '../components/WelcomeCard.jsx';
import QuickActions from '../components/QuickActions.jsx';
import TodaySummary from '../components/TodaySummary.jsx';
import CatAssistant from '../components/CatAssistant.jsx';
import { apiService } from '../services/api';

const Index = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todayStats, setTodayStats] = useState({
    caloriesIn: 0,
    caloriesOut: 0,
    exerciseMinutes: 0
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 计算今日统计数据
    const calculateTodayStats = () => {
      // 获取饮食记录
      const dietRecords = JSON.parse(localStorage.getItem('dietRecords') || '[]');
      const today = new Date().toISOString().split('T')[0];
      const todayDietRecords = dietRecords.filter(record => record.date === today);
      
      // 计算摄入卡路里
      const caloriesIn = todayDietRecords.reduce((sum, record) => sum + (record.calories || 0), 0);
      
      // 获取运动记录
      const exerciseRecords = JSON.parse(localStorage.getItem('exerciseRecords') || '[]');
      const todayExerciseRecords = exerciseRecords.filter(record => record.date === today);
      
      // 计算消耗卡路里和运动分钟
      const caloriesOut = todayExerciseRecords.reduce((sum, record) => sum + (record.calories || 0), 0);
      const exerciseMinutes = todayExerciseRecords.reduce((sum, record) => sum + (record.duration || 0), 0);
      
      setTodayStats({
        caloriesIn,
        caloriesOut,
        exerciseMinutes
      });
    };

    calculateTodayStats();
  }, []);

  useEffect(() => {
    // 滚动到最新消息
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversations(prev => [...prev, userMessage]);
    setInputValue('');
    
    try {
      // 调用三个API进行多模型对话
      const models = [
        { name: 'Hunyuan-A13B-Instruct', label: 'Hunyuan-A13B' },
        { name: 'DeepSeek-V3.2', label: 'DeepSeek-V3.2' },
        { name: 'Qwen3-235B-A22B', label: 'Qwen3-235B' }
      ];
      
      // 存储前一个模型的回答
      let previousResponses = [];
      
      // 为每个模型创建响应
      for (const model of models) {
        try {
          // 创建AI响应消息
          const aiMessage = {
            id: Date.now() + Math.random(),
            role: 'assistant',
            content: '',
            model: model.label,
            timestamp: new Date().toLocaleTimeString(),
            isStreaming: true
          };
          
          setConversations(prev => [...prev, aiMessage]);
          
          // 构建消息历史，包括原始输入和之前模型的回答
          const messages = [
            { role: "user", content: inputValue }
          ];
          
          // 添加之前模型的回答作为上下文
          previousResponses.forEach(response => {
            messages.push({ role: "assistant", content: response });
          });
          
          // 调用API获取流式响应
          const response = await fetch('https://aiping.cn/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer QC-5ab87d6c6fdd394e54495966499b5282-d5b884a549ed1e88808ab3148594f239'
            },
            body: JSON.stringify({
              model: model.name,
              messages: messages,
              stream: true,
              extra_body: {
                enable_thinking: false,
                provider: {
                  only: [],
                  order: [],
                  sort: null,
                  input_price_range: [],
                  output_price_range: [],
                  input_length_range: [],
                  throughput_range: [],
                  latency_range: []
                }
              }
            })
          });
          
          if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
          }
          
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let fullResponse = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content;
                  
                  if (content) {
                    fullResponse += content;
                    setConversations(prev => 
                      prev.map(msg => 
                        msg.id === aiMessage.id 
                          ? { ...msg, content: msg.content + content }
                          : msg
                      )
                    );
                  }
                } catch (e) {
                  console.error('解析流式响应失败:', e);
                }
              }
            }
          }
          
          // 标记流式传输完成
          setConversations(prev => 
            prev.map(msg => 
              msg.id === aiMessage.id 
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          
          // 保存当前模型的回答，用于下一个模型的输入
          previousResponses.push(`${model.label}的回答: ${fullResponse}`);
          
        } catch (error) {
          console.error(`模型 ${model.label} 调用失败:`, error);
          // 添加错误消息
          const errorMessage = {
            id: Date.now() + Math.random(),
            role: 'assistant',
            content: `抱歉，${model.label} 模型暂时无法响应，请稍后再试。`,
            model: model.label,
            timestamp: new Date().toLocaleTimeString(),
            error: true
          };
          setConversations(prev => [...prev, errorMessage]);
        }
      }
      
    } catch (error) {
      console.error('对话失败:', error);
      const errorMessage = {
        id: Date.now(),
        role: 'assistant',
        content: '抱歉，处理您的请求时出现错误，请稍后再试。',
        model: 'System',
        timestamp: new Date().toLocaleTimeString(),
        error: true
      };
      setConversations(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <WelcomeCard />
          </div>
          <div className="ml-4">
            <CatAssistant />
          </div>
          <div className="ml-4">
            <Link to="/devices" className="text-gray-600 hover:text-gray-900">
              <Bluetooth className="h-6 w-6" />
            </Link>
          </div>
        </div>
        
        {/* AI对话对话框 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="向AI助手提问..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* 对话历史 */}
          {conversations.length > 0 && (
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
              {conversations.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-50 ml-8' 
                      : msg.error 
                        ? 'bg-red-50 mr-8' 
                        : 'bg-gray-50 mr-8'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">
                      {msg.role === 'user' ? '您' : msg.model || 'AI助手'}
                    </span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  {msg.isStreaming && (
                    <div className="mt-1">
                      <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <TodaySummary 
            caloriesIn={todayStats.caloriesIn}
            caloriesOut={todayStats.caloriesOut}
            exerciseMinutes={todayStats.exerciseMinutes}
          />
        </div>
        
        <div className="mt-6">
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
                <Target className="h-5 w-5" />
                <span className="font-medium">手动添加</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/diet" 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Utensils className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">🍽️ 饮食记录</h3>
                <p className="text-sm text-gray-600">记录今日饮食，AI智能分析</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/exercise" 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Dumbbell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">🏋️ 运动记录</h3>
                <p className="text-sm text-gray-600">记录运动数据，个性化计划</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/progress" 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">📈 减重进度</h3>
                <p className="text-sm text-gray-600">查看减重成果，AI分析报告</p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/profile" 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">👤 个人中心</h3>
                <p className="text-sm text-gray-600">管理个人信息，设置目标</p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">📊 本周进度</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">75%</div>
                <div className="text-sm text-gray-600">完成度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">运动天数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1.2kg</div>
                <div className="text-sm text-gray-600">减重</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
