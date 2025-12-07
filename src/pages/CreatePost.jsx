import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const { addPost } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    // Simulate image upload or just pass null for now
    addPost(content, null);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">发布新帖子</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              分享你的机器人趣事或编程挑战
            </label>
            <textarea
              id="content"
              rows="6"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="今天我和机器人一起做了什么..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ImageIcon size={20} />
              <span>添加图片/视频</span>
            </button>

            <button
              type="submit"
              disabled={!content.trim()}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                content.trim() 
                  ? 'bg-primary text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
              <span>发布</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
