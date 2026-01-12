import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { posts, likePost, currentUser, simulateLikeOnMyPost } = useApp();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">社区动态</h1>
        {/* 删除了“(测试) 模拟别人给我点赞”按钮 */}
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          const isLiked = post.likedBy.includes(currentUser.id);
          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3">
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName} 
                  className="w-10 h-10 rounded-full bg-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-2">
                <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.media && (
                <div className="mt-2">
                  {post.media.type === 'video' ? (
                    <video src={post.media.url} controls className="w-full h-auto max-h-96" />
                  ) : (
                    <img src={post.media.url} alt="Post content" className="w-full h-auto object-cover max-h-96" />
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t border-gray-50 flex items-center justify-between text-gray-500">
                <button 
                  onClick={() => likePost(post.id)}
                  className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <MessageCircle size={20} />
                  <span>评论</span>
                </button>
                
                <button className="flex items-center space-x-1 hover:text-green-500">
                  <Share2 size={20} />
                  <span>分享</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
