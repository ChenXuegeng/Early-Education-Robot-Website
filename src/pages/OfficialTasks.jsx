import React from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Three challenges as requested
const officialTasks = [
  {
    id: 't1',
    title: '最优路径规划挑战',
    description: '让机器人在给定地图中选择最短或耗时最少的路径到达终点。可发布演示视频说明你的算法与思路。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
  {
    id: 't2',
    title: '物流搬运编程任务',
    description: '编程让机器人在仓储场景中完成货物拾取、搬运与投放的流程。发布操作视频并讲解关键逻辑。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
  {
    id: 't3',
    title: '避障编程挑战',
    description: '设计避障策略，让机器人在复杂环境中安全通过。上传测试视频并分享策略参数。',
    reward: '点赞集赞可获积分（每次 +10）',
  },
];

const OfficialTasks = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={28} />
        官方任务 / 周挑战
      </h1>
      <div className="space-y-6">
        {officialTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
            </div>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              onClick={() => navigate(`/task-detail?id=${task.id}`)}
            >
              挑战
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialTasks;
