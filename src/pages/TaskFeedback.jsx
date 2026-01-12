import React from "react";

const TaskFeedback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">🎉 恭喜你完成任务！</h2>
        <p className="mb-2 text-green-800">你已成功上传视频，获得了任务积分。</p>
        <p className="mb-4 text-gray-600">快去社区看看其他小伙伴的作品吧！</p>
        <a href="#/community" className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark">前往社区互动</a>
      </div>
    </div>
  );
};

export default TaskFeedback;
