import React from 'react';
import { Award, Star, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Achievements = () => {
  const { currentUser, users } = useApp();
  
  // 合并当前用户和其他用户，生成排行榜
  const allUsers = [
    { ...currentUser, achievements: ['本周挑战达人'] },
    ...users.map(user => {
      // 给特定用户设置固定分数和成就
      if (user.id === 'u2') return { ...user, points: 90, achievements: ['清扫路线专家'] };
      if (user.id === 'u3') return { ...user, points: 80, achievements: ['家庭协作之星'] };
      // 其他用户随机分配分数
      return { 
        ...user, 
        points: Math.floor(Math.random() * 70) + 10,
        achievements: ['新手上路'] 
      };
    })
  ];
  
  // 按积分降序排序
  const rankings = allUsers.sort((a, b) => b.points - a.points);
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Star className="text-yellow-500" size={28} />
        积分 / 成就 / 排行榜
      </h1>
      {/* 我的积分与成就 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center mb-2">
          <User className="text-primary mr-2" size={20} />
          <span className="font-semibold text-gray-900">{currentUser.name}</span>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <Award className="text-yellow-500" size={20} />
          <span className="text-lg font-bold text-primary">{currentUser.points} 积分</span>
        </div>
        <div className="text-sm text-gray-600">成就示例：积极参与、挑战达人、清扫路线专家等</div>
      </div>
      {/* 排行榜 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          排行榜
        </h2>
        <ol className="space-y-4">
          {rankings.map((user, idx) => (
            <li key={user.id} className="flex items-center gap-4">
              <span className={`text-xl font-bold w-6 text-center ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-500' : 'text-yellow-900'}`}>{idx + 1}</span>
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-200" />
              <span className="font-semibold text-gray-900">{user.name}</span>
              <span className="ml-auto text-primary font-bold">{user.points} 积分</span>
              <span className="ml-4 text-xs text-gray-500">{user.achievements.join('，')}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Achievements;
