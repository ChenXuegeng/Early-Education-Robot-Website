import React from 'react';
import { CalendarCheck, Trophy } from 'lucide-react';

const officialTasks = [
  {
    id: 1,
    title: '本周挑战：让机器人画一个正方形',
    description: '用你喜欢的编程方式，让机器人在纸上画出一个正方形。可以上传照片或视频。',
    reward: '完成奖励：20积分',
    type: 'weekly',
  },
  {
    id: 2,
    title: '官方任务：清扫路线优化',
    description: '设计一条让机器人最快完成清扫的路线，并分享你的思路。',
    reward: '完成奖励：30积分',
    type: 'official',
  },
  {
    id: 3,
    title: '本周挑战：家庭协作',
    description: '和家人一起完成一次机器人编程任务，拍照记录过程。',
    reward: '完成奖励：15积分',
    type: 'weekly',
  },
];

const OfficialTasks = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="text-yellow-500" size={28} />
        官方任务 / 周挑战（测试修改 by Copilot）
      </h1>
      <div className="space-y-6">
        {officialTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-2">
              {task.type === 'weekly' ? (
                <CalendarCheck className="text-blue-500 mr-2" size={20} />
              ) : (
                <Trophy className="text-yellow-500 mr-2" size={20} />
              )}
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
            </div>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">{task.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialTasks;
