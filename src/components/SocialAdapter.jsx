import React, { useState } from 'react';
import { Users, Utensils, AlertTriangle, CheckCircle, Lightbulb, MessageCircle } from 'lucide-react';
import { apiService } from '../services/api';
import ReactMarkdown from 'react-markdown';

const SocialAdapter = () => {
  const [selectedScenario, setSelectedScenario] = useState('dinner');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scenarios = [
    { id: 'dinner', name: '聚餐', icon: Utensils },
    { id: 'party', name: '派对', icon: Users },
    { id: 'business', name: '商务宴请', icon: Users },
    { id: 'travel', name: '旅行', icon: Users }
  ];
  
  const adaptationPlans = {
    dinner: {
      title: '聚餐饮食调整方案',
      tips: [
        '选择清蒸、水煮等低油烹饪方式',
        '控制主食摄入量，多吃蔬菜',
        '避免高糖饮料，选择茶水或白水',
        '细嚼慢咽，控制进食速度'
      ],
      alternatives: [
        { original: '红烧肉', alternative: '清蒸鱼', calories: '减少200卡' },
        { original: '白米饭', alternative: '杂粮饭', calories: '减少50卡' },
        { original: '可乐', alternative: '柠檬水', calories: '减少150卡' }
      ]
    },
    party: {
      title: '派对饮食调整方案',
      tips: [
        '提前吃些健康零食，避免空腹',
        '选择小份食物，避免过量',
        '多喝水，少喝酒精饮料',
        '主动参与社交，减少专注进食'
      ],
      alternatives: [
        { original: '薯片', alternative: '坚果', calories: '减少100卡' },
        { original: '啤酒', alternative: '苏打水', calories: '减少120卡' },
        { original: '蛋糕', alternative: '水果', calories: '减少200卡' }
      ]
    },
    business: {
      title: '商务宴请调整方案',
      tips: [
        '提前了解菜单，做好心理准备',
        '优先选择清淡菜品',
        '控制饮酒量，以茶代酒',
        '多参与谈话，减少进食时间'
      ],
      alternatives: [
        { original: '白酒', alternative: '红酒', calories: '减少150卡' },
        { original: '油炸菜品', alternative: '清汤', calories: '减少180卡' },
        { original: '甜点', alternative: '水果拼盘', calories: '减少120卡' }
      ]
    },
    travel: {
      title: '旅行饮食调整方案',
      tips: [
        '提前准备健康零食',
        '选择当地特色但健康的食物',
        '保持规律作息，避免暴饮暴食',
        '多喝水，保持身体水分'
      ],
      alternatives: [
        { original: '快餐', alternative: '当地小吃', calories: '减少100卡' },
        { original: '碳酸饮料', alternative: '当地茶饮', calories: '减少120卡' },
        { original: '零食', alternative: '水果', calories: '减少80卡' }
      ]
    }
  };
  
  // 安全获取当前计划，确保有默认值
  const getCurrentPlan = () => {
    const plan = adaptationPlans[selectedScenario];
    return {
      title: plan?.title || '饮食调整方案',
      tips: plan?.tips || [],
      alternatives: plan?.alternatives || []
    };
  };
  
  const currentPlan = getCurrentPlan();
  
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      // 调用AI API获取回答
      const response = await apiService.getSocialSituationAdvice(question);
      let advice = response.advice || '抱歉，我无法回答这个问题。请稍后再试。';
      
      // 处理回答中的"#"，自动排版换行
      advice = advice.replace(/#/g, '\n');
      
      setAnswer(advice);
    } catch (error) {
      console.error('获取AI回答失败:', error);
      setAnswer('抱歉，获取回答时出现错误。请稍后再试。');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">👥 社交情境适应器</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedScenario === scenario.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${
                  selectedScenario === scenario.id ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedScenario === scenario.id ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {scenario.name}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="向AI助手提问..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <button
              onClick={handleAskQuestion}
              disabled={loading}
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </button>
          </div>
          {answer && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-lg font-bold" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-base font-bold" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-sm font-bold" {...props} />,
                  p: ({node, ...props}) => <p className="mb-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {currentPlan.title}
        </h4>
        
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h5 className="font-medium text-gray-900">💡 实用建议</h5>
          </div>
          <div className="space-y-2">
            {currentPlan.tips && currentPlan.tips.length > 0 ? (
              currentPlan.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">暂无建议</div>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Utensils className="h-5 w-5 text-orange-600" />
            <h5 className="font-medium text-gray-900">🍽️ 食物替代方案</h5>
          </div>
          <div className="space-y-3">
            {currentPlan.alternatives && currentPlan.alternatives.length > 0 ? (
              currentPlan.alternatives.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-700">{alt.original}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">→</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{alt.alternative}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{alt.calories}</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">暂无替代方案</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAdapter;
