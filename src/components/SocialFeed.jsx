import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Search, Filter } from 'lucide-react';

const SocialFeed = () => {
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
      liked: false
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
      liked: true
    }
  ]);
  
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  
  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
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
      image: '',
      likes: 0,
      comments: 0,
      time: '刚刚',
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPost(false);
  };
  
  return (
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
              <div className="flex justify-between items-center mt-3">
                <button className="text-blue-600 hover:text-blue-700">
                  添加图片
                </button>
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
  );
};

export default SocialFeed;
