import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TASKS = [
  {
    id: 't1',
    title: '最优路径规划挑战',
    detail: '让机器人在给定地图中选择最短或耗时最少的路径到达终点。\n\n详细要求：\n1. 提供地图示意图或描述。\n2. 说明你的算法思路（如A*、Dijkstra等）。\n3. 上传演示视频，展示机器人从起点到终点的全过程。\n4. 可补充遇到的难点与优化建议。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
  {
    id: 't2',
    title: '物流搬运编程任务',
    detail: '编程让机器人在仓储场景中完成货物拾取、搬运与投放的流程。\n\n详细要求：\n1. 设计仓储场景（可手绘或软件建模）。\n2. 说明机器人动作流程和关键代码。\n3. 上传操作视频，展示完整搬运过程。\n4. 分享遇到的问题与解决方法。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
  {
    id: 't3',
    title: '避障编程挑战',
    detail: '设计避障策略，让机器人在复杂环境中安全通过。\n\n详细要求：\n1. 描述障碍物分布和环境。\n2. 说明避障算法（如红外、超声、视觉等）。\n3. 上传测试视频，展示避障效果。\n4. 可补充参数调优经验。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
];

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const TaskDetail = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const taskId = query.get('id');
  const task = TASKS.find(t => t.id === taskId);
  const [video, setVideo] = useState(null);
  const [desc, setDesc] = useState("");

  if (!task) return <div className="p-6">未找到该任务</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可扩展上传逻辑
    navigate('/task-feedback');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <div className="mb-4 whitespace-pre-line text-gray-700">{task.detail}</div>
      <div className="mb-2 text-sm text-yellow-700 bg-yellow-100 inline-block px-3 py-1 rounded">{task.reward}</div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 text-sm"
          rows={3}
          placeholder="补充说明（可选）"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideo(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark"
          disabled={!video}
        >
          {video ? '上传并完成任务' : '请先选择视频'}
        </button>
      </form>
    </div>
  );
};

export default TaskDetail;
