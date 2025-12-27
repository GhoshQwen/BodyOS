import React, { useState } from 'react';
import { Bluetooth, Search, Link, CheckCircle, AlertCircle } from 'lucide-react';

const DeviceConnection = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: '智能体重秤', type: 'scale', connected: false },
    { id: 2, name: '血糖仪', type: 'glucose', connected: false },
    { id: 3, name: '智能手环', type: 'fitness', connected: false }
  ]);
  const [searching, setSearching] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  const handleSearch = () => {
    setSearching(true);
    // 模拟搜索设备
    setTimeout(() => {
      setSearching(false);
      // 添加一些模拟设备
      const newDevices = [
        { id: 4, name: '智能水杯', type: 'water', connected: false },
        { id: 5, name: '体脂秤', type: 'bodyfat', connected: false }
      ];
      setDevices(prev => [...prev, ...newDevices]);
    }, 2000);
  };

  const handleConnect = (deviceId) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, connected: !device.connected }
          : device
      )
    );
    
    setConnectedDevices(prev => {
      const device = devices.find(d => d.id === deviceId);
      if (device.connected) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'scale':
        return '⚖️';
      case 'glucose':
        return '🩸';
      case 'fitness':
        return '⌚';
      case 'water':
        return '💧';
      case 'bodyfat':
        return '📊';
      default:
        return '📱';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🔗 设备连接</h1>
          <button 
            onClick={handleSearch}
            disabled={searching}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {searching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span>{searching ? '搜索中...' : '搜索设备'}</span>
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">已连接设备</h2>
          {connectedDevices.length > 0 ? (
            <div className="space-y-3">
              {devices.filter(device => device.connected).map(device => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                    <span className="font-medium text-gray-900">{device.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600">已连接</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bluetooth className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">暂无已连接设备</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">可用设备</h2>
          <div className="space-y-3">
            {devices.map(device => (
              <div key={device.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                  <span className="font-medium text-gray-900">{device.name}</span>
                </div>
                <button
                  onClick={() => handleConnect(device.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    device.connected
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {device.connected ? '已连接' : '连接'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceConnection;
