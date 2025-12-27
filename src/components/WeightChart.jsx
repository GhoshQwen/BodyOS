import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightChart = () => {
  const data = [
    { date: '01-15', weight: 75.0, target: 65 },
    { date: '01-16', weight: 74.8, target: 65 },
    { date: '01-17', weight: 74.9, target: 65 },
    { date: '01-18', weight: 74.6, target: 65 },
    { date: '01-19', weight: 74.4, target: 65 },
    { date: '01-20', weight: 74.2, target: 65 },
    { date: '01-21', weight: 74.0, target: 65 },
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">📈 体重变化趋势</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">实际体重</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">目标体重</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip 
              formatter={(value, name) => [
                `${value}kg`, 
                name === 'weight' ? '实际体重' : '目标体重'
              ]}
              labelFormatter={(label) => `日期: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#10B981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-600">本周减重</span>
          <span className="font-semibold text-blue-800">0.8kg</span>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;
