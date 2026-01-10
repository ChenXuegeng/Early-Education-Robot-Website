import React, { useState, useRef } from 'react';
import { Heart, MessageSquarePlus, Upload, PlayCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TaskCommentSection = ({ taskId }) => {
  const { currentUser, taskComments, addTaskComment, likeTaskComment, simulateLikeOnMyTaskComment } = useApp();
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const videoInputRef = useRef(null);

  const comments = taskComments.filter(c => c.taskId === taskId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !videoUrl) return;
    addTaskComment(taskId, text.trim(), videoUrl);
    setText('');
    setVideoUrl(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="mt-4">
      {/* Editor */}
      <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-start gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full" />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="发布你的视频或说明，支持上传mp4等视频文件"
              className="w-full resize-none rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1 cursor-pointer text-gray-600 hover:text-primary">
                  <Upload size={18} />
                  <span className="text-sm">上传视频</span>
                  <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
                </label>
                {videoUrl && (
                  <span className="inline-flex items-center gap-1 text-green-600 text-xs">
                    <PlayCircle size={16} /> 已选择视频
                  </span>
                )}
              </div>
              <button type="submit" className="px-3 py-1.5 bg-primary text-white rounded-md text-sm flex items-center gap-1">
                <MessageSquarePlus size={16} /> 发布评论
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3 mt-3">
        {comments.map(c => {
          const isLiked = c.likedBy?.includes(currentUser.id);
          return (
            <div key={c.id} className="bg-white border border-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <img src={c.authorAvatar} alt={c.authorName} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{c.authorName}</div>
                  <div className="text-xs text-gray-500">{c.timestamp}</div>
                </div>
              </div>
              {c.content && <p className="text-sm text-gray-800 mb-2 whitespace-pre-wrap">{c.content}</p>}
              {c.video && (
                <video src={c.video} controls className="w-full rounded-md bg-black/5 max-h-80 mb-2" />
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <button
                  onClick={() => likeTaskComment(c.id)}
                  className={`inline-flex items-center gap-1 text-sm ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{c.likes}</span>
                </button>
                {c.authorId === currentUser.id && (
                  <button
                    onClick={() => simulateLikeOnMyTaskComment(c.id)}
                    className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700"
                  >
                    模拟别人点赞我 +10积分
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {comments.length === 0 && (
          <div className="text-xs text-gray-500">还没有评论，来发布第一个视频吧！</div>
        )}
      </div>
    </div>
  );
};

export default TaskCommentSection;
