import React, { useState } from 'react';
import { User, Target, Calendar, Award, Settings, Camera, Calculator, RefreshCw, Bell, Shield, Users, MessageCircle, LogOut } from 'lucide-react';
import ProfileCard from '../components/ProfileCard.jsx';
import GoalCard from '../components/GoalCard.jsx';
import AchievementCard from '../components/AchievementCard.jsx';
import CalorieCalculator from '../components/CalorieCalculator.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '张小明',
    age: 28,
    height: 170,
    weight: 75,
    targetWeight: 65,
    joinDate: '2024-01-15',
    avatar: 'https://nocode.meituan.com/photo/search?keyword=person&width=100&height=100&source=meituan'
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const handleSaveProfile = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  const handleResetData = () => {
    setUserInfo({
      name: '张小明',
      age: 28,
      height: 170,
      weight: 75,
      targetWeight: 65,
      joinDate: '2024-01-15',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=person&width=100&height=100&source=meituan'
    });
    setShowResetDialog(false);
    // 这里可以添加清空成就和其他历史记录的逻辑
  };

  const handleAboutUs = () => {
    window.open('https://xbxb2sqn7mkg2.ok.kimi.link/', '_blank');
  };

  const handleLogout = () => {
    // 清除用户信息
    localStorage.removeItem('userInfo');
    // 跳转到登录页面
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">👤 个人中心</h1>
          <button 
            onClick={() => setShowEditForm(true)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👤 个人信息
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'calculator' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🧮 卡路里计算器
            </button>
          </div>
        </div>
        
        {activeTab === 'profile' && (
          <>
            <ProfileCard userInfo={userInfo} />
            
            <div className="mt-6">
              <GoalCard userInfo={userInfo} />
            </div>
            
            <div className="mt-6">
              <AchievementCard />
            </div>
            
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚙️ 应用设置</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setShowNotificationSettings(true)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">🔔 通知设置</span>
                  <Bell className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowPrivacySettings(true)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">🔒 隐私设置</span>
                  <Shield className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setShowResetDialog(true)}
                  className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600"
                >
                  <span>🔄 重置所有数据</span>
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleAboutUs}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700">ℹ️ 关于我们</span>
                  <span className="text-gray-400">&gt;</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
                >
                  <span>🚪 退出当前账户</span>
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'calculator' && <CalorieCalculator />}
        
        {showEditForm && (
          <ProfileEdit 
            userInfo={userInfo} 
            onClose={() => setShowEditForm(false)}
            onSave={handleSaveProfile}
          />
        )}
        
        {showResetDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">确认重置</h2>
              <p className="text-gray-600 mb-6">
                此操作将清空所有成就和历史记录，并将个人信息重置为默认值。此操作不可撤销，请确认是否继续？
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResetDialog(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleResetData}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  确认重置
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotificationSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🔔 通知设置</h2>
                <button 
                  onClick={() => setShowNotificationSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">首页小猫提醒</span>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">社交界面红点提醒</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">不提醒</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </div>
          </div>
        )}

        {showPrivacySettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🔒 隐私设置</h2>
                <button 
                  onClick={() => setShowPrivacySettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">不让他人看我的帖子</span>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">不看特定用户的帖子</span>
                  <button className="text-blue-600 hover:text-blue-700">设置</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
