import React, { useState } from 'react';
import { Home, MessageCircle, User, Bell, Users, Plus, Search, Filter, Heart, Share2, UserPlus } from 'lucide-react';
import SocialFeed from '../components/SocialFeed.jsx';
import MessageCenter from '../components/MessageCenter.jsx';

const Social = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: '健康达人',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=person&width=50&height=50&source=meituan',
      content: '今天完成了5公里晨跑，感觉棒极了！',
      image: 'https://nocode.meituan.com/photo/search?keyword=running&width=300&height=200',
      likes: 24,
      comments: 5,
      time: '2小时前',
      liked: false,
      following: false
    },
    {
      id: 2,
      user: '减肥小能手',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=woman&width=50&height=50&source=meituan',
      content: '分享一道低卡健康餐：蒸蛋羹配西兰花',
      image: 'https://nocode.meituan.com/photo/search?keyword=healthy,food&width=300&height=200',
      likes: 18,
      comments: 3,
      time: '4小时前',
      liked: true,
      following: true
    }
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: '健康达人',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=person&width=50&height=50&source=meituan',
      lastMessage: '你的晨跑计划看起来很棒！',
      time: '10:30',
      unread: 2
    },
    {
      id: 2,
      user: '减肥小能手',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=woman&width=50&height=50&source=meituan',
      lastMessage: '谢谢分享，我也试试这个食谱',
      time: '昨天',
      unread: 0
    },
    {
      id: 3,
      user: '运动教练',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=trainer&width=50&height=50&source=meituan',
      lastMessage: '你的训练计划需要调整一下',
      time: '2天前',
      unread: 1
    },
    {
      id: 4,
      user: '营养师',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=nutritionist&width=50&height=50&source=meituan',
      lastMessage: '建议增加蛋白质摄入',
      time: '3天前',
      unread: 0
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleFollow = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, following: !post.following }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      user: '我',
      avatar: 'https://nocode.meituan.com/photo/search?keyword=person&width=50&height=50&source=meituan',
      content: newPostContent,
      image: newPostImage,
      likes: 0,
      comments: 0,
      time: '刚刚',
      liked: false,
      following: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
    setShowNewPost(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">👥 社交</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('messages')}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'feed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📰 动态
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'messages' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              💬 消息
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'following' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👫 关注
            </button>
          </div>
        </div>
        
        {activeTab === 'feed' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://nocode.meituan.com/photo/search?keyword=person&width=50&height=50&source=meituan" 
                  alt="我的头像" 
                  className="w-10 h-10 rounded-full mx-auto object-cover"
                />
                <button 
                  onClick={() => setShowNewPost(true)}
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-left text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  分享你的减重心得...
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {showNewPost && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <img 
                    src="https://nocode.meituan.com/photo/search?keyword=person&width=50&height=50&source=meituan" 
                    alt="我的头像" 
                    className="w-10 h-10 rounded-full mx-auto object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="分享你的减重心得..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    {newPostImage && (
                      <div className="mt-3 relative">
                        <img 
                          src={newPostImage} 
                          alt="上传的图片" 
                          className="w-full rounded-lg mx-auto object-cover"
                        />
                        <button 
                          onClick={() => setNewPostImage(null)}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        <Plus className="h-5 w-5 inline mr-1" />
                        添加图片
                        <input 
                          type="file" 
                          accept="image/*,video/*" 
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <div className="space-x-2">
                        <button 
                          onClick={() => setShowNewPost(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          取消
                        </button>
                        <button 
                          onClick={handleNewPost}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          发布
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={post.avatar} 
                    alt={post.user} 
                    className="w-10 h-10 rounded-full mx-auto object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.user}</h3>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                  <div className="ml-auto">
                    <button 
                      onClick={() => handleFollow(post.id)}
                      className={`flex items-center space-x-1 ${
                        post.following 
                          ? 'text-blue-600' 
                          : 'text-gray-500'
                      } hover:text-blue-600 transition-colors`}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>{post.following ? '已关注' : '关注'}</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="帖子图片" 
                    className="w-full rounded-lg mb-3 mx-auto object-cover"
                  />
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.liked ? 'text-red-500' : 'text-gray-500'
                    } hover:text-red-500 transition-colors`}
                  >
                    <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>分享</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'messages' && <MessageCenter conversations={conversations} />}
        
        {activeTab === 'following' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">👫 我的关注</h2>
            <div className="space-y-4">
              {posts.filter(post => post.following).map((post) => (
                <div key={post.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={post.avatar} 
                    alt={post.user} 
                    className="w-12 h-12 rounded-full mx-auto object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.user}</h3>
                    <p className="text-sm text-gray-500">关注时间: {post.time}</p>
                  </div>
                </div>
              ))}
              {posts.filter(post => post.following).length === 0 && (
                <p className="text-gray-500 text-center py-8">您还没有关注任何人</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;
