import React from 'react';
import { Settings, MapPin, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { currentUser, posts } = useApp();
  
  const myPosts = posts.filter(post => post.authorId === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-primary to-purple-500"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md"
            />
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
              <Settings size={18} />
              <span>编辑资料</span>
            </button>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
            <p className="text-gray-600 mb-4">{currentUser.bio}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>北京, 中国</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>加入于 2024年1月</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">个人成就</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">总积分</span>
                <span className="font-bold text-primary">{currentUser.points}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">发布的帖子</span>
                <span className="font-bold text-gray-900">{myPosts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">获得的赞</span>
                <span className="font-bold text-gray-900">
                  {myPosts.reduce((acc, post) => acc + post.likes, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - My Posts */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">我的动态</h2>
          <div className="space-y-6">
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={post.authorAvatar} 
                      alt={post.authorName} 
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{post.authorName}</h3>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post content" className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span className="text-red-500">❤️</span>
                      <span>{post.likes} 赞</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                还没有发布过帖子哦，快去分享吧！
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
