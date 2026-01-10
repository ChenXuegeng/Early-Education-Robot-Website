import React from "react";
import { useApp } from '../context/AppContext';
import { Heart } from 'lucide-react';
import PostComments from '../components/PostComments';

const Community = () => {
  const { posts, likePost, currentUser } = useApp();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">社区互动</h2>
      {posts.length === 0 && <div className="text-gray-500">还没有作品，快来发布吧！</div>}
      <div className="space-y-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-2">
              <img src={post.authorAvatar} alt={post.authorName} className="w-9 h-9 rounded-full" />
              <div>
                <div className="font-bold text-gray-800">{post.authorName}</div>
                <div className="text-xs text-gray-400">{post.timestamp}</div>
              </div>
            </div>
            <div className="mb-2 text-gray-800 whitespace-pre-line">{post.content}</div>
            {post.image && (
              <div className="mb-2">
                <img src={post.image} alt="作品" className="rounded max-h-80" />
              </div>
            )}
            <button
              onClick={() => likePost(post.id)}
              className={`inline-flex items-center gap-1 text-sm mb-2 ${post.likedBy.includes(currentUser.id) ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <Heart size={18} fill={post.likedBy.includes(currentUser.id) ? 'currentColor' : 'none'} />
              <span>{post.likes}</span>
              <span className="ml-1">点赞</span>
            </button>
            <PostComments postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
