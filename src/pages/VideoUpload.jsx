import React from "react";

const VideoUpload = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">视频上传</h2>
      <p>上传你的任务视频，与社区分享你的成果。</p>
      <input type="file" accept="video/*" className="mt-4" />
    </div>
  );
};

export default VideoUpload;
