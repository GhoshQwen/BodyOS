import React, { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { apiService } from '../services/api';
import ReactMarkdown from 'react-markdown';

const MemoryInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 模拟历史饮食记录数据
  const dietHistory = [
    { date: '2024-01-20', food: '燕麦粥', calories: 150 },
    { date: '2024-01-20', food: '鸡胸肉沙拉', calories: 280 },
    { date: '2024-01-19', food: '蒸蛋羹', calories: 120 },
    { date: '2024-01-19', food: '苹果', calories: 80 },
    { date: '2024-01-18', food: '全麦面包', calories: 200 },
    { date: '2024-01-18', food: '酸奶', calories: 100 }
  ];

  const generateInsights = async () => {
    setLoading(true);
    try {
      // 调用三个API进行多模型对话
      const apiPromises = [
        // API 1: 使用DeepSeek-V3.2模型
        apiService.getMetabolicAdaptation({ dietHistory }),
        // API 2: 使用图片生成模型（这里用作文本分析）
        apiService.analyzeFoodImage({ prompt: `分析饮食历史: ${JSON.stringify(dietHistory)}` }),
        // API 3: 使用Qwen3-235B-A22B模型
        apiService.generateRecipe({ preferences: { dietHistory } })
      ];
      
      const results = await Promise.allSettled(apiPromises);
      
      // 处理结果
      const newInsights = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          const content = result.value.analysis || result.value.advice || result.value.prediction || JSON.stringify(result.value);
          return {
            id: Date.now() + index,
            type: 'ai',
            title: `AI建议 ${index + 1}`,
            description: content,
            icon: Brain,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          };
        } else {
          return {
            id: Date.now() + index,
            type: 'error',
            title: `AI建议 ${index + 1}`,
            description: '抱歉，生成建议时出现错误。',
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50'
          };
        }
      });
      
      setInsights(newInsights);
    } catch (error) {
      console.error('生成AI洞察失败:', error);
      setInsights([
        {
          id: Date.now(),
          type: 'error',
          title: 'AI建议',
          description: '生成建议时出现错误，请稍后再试。',
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">🧠 AI记忆洞察</h3>
        </div>
        <button
          onClick={generateInsights}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? '生成中...' : '生成AI建议'}
        </button>
      </div>
      
      <div className="space-y-4">
        {insights.length > 0 ? (
          insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.id} className={`p-4 rounded-lg ${insight.bgColor}`}>
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 ${insight.color} mt-0.5`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <div className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none">
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
                        {insight.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">点击"生成AI建议"按钮，基于您的饮食历史生成个性化建议</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700">
          AI正在学习您的习惯，为您提供更个性化的建议
        </p>
      </div>
    </div>
  );
};

export default MemoryInsights;
