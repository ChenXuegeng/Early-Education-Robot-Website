import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageSquarePlus } from 'lucide-react';

const defaultComments = [
  {
    id: 'c_zesheng',
    author: '泽神',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zesheng',
    content: '乐乐的视频真棒，点赞！',
    timestamp: '1分钟前',
    likes: 2,
    likedBy: [],
  },
  {
    id: 'c_lulu',
    author: '噜噜',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lulu',
    content: '我也要试试上传视频！',
    timestamp: '3分钟前',
    likes: 1,
    likedBy: [],
  },
];

const PostComments = ({ postId }) => {
  const { currentUser } = useApp();
  const [comments, setComments] = useState(defaultComments);
  const [text, setText] = useState('');

  const handleLike = (id) => {
    setComments(cs => cs.map(c => {
      if (c.id === id && !c.likedBy.includes(currentUser.id)) {
        return { ...c, likes: c.likes + 1, likedBy: [...c.likedBy, currentUser.id] };
      }
      return c;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments([
      {
        id: 'c_' + Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: text.trim(),
        timestamp: '刚刚',
        likes: 0,
        likedBy: [],
      },
      ...comments,
    ]);
    setText('');
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="写评论..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-3 py-1 rounded flex items-center gap-1 text-sm">
          <MessageSquarePlus size={16} /> 评论
        </button>
      </form>
      <div className="space-y-2">
        {comments.map(c => (
          <div key={c.id} className="flex items-start gap-2 bg-gray-50 rounded p-2">
            <img src={c.avatar} alt={c.author} className="w-7 h-7 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <span className="font-bold">{c.author}</span>
                <span className="text-gray-400">{c.timestamp}</span>
              </div>
              <div className="text-sm text-gray-800 mb-1">{c.content}</div>
              <button
                onClick={() => handleLike(c.id)}
                className={`inline-flex items-center gap-1 text-xs ${c.likedBy.includes(currentUser.id) ? 'text-red-500' : 'hover:text-red-500'}`}
              >
                <Heart size={14} fill={c.likedBy.includes(currentUser.id) ? 'currentColor' : 'none'} />
                <span>{c.likes}</span>
              </button>
            </div>
          </div>
        ))}
        {comments.length === 0 && <div className="text-xs text-gray-400">还没有评论，快来抢沙发！</div>}
      </div>
    </div>
  );
};

export default PostComments;
