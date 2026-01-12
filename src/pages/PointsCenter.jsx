import React from 'react';
import { Award, Gift, Star, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PointsCenter = () => {
  const { currentUser } = useApp();

  const officialRewards = [
    { id: 1, title: '新机折价券 (50元)', cost: 500, icon: Zap, color: 'bg-blue-100 text-blue-600' },
    { id: 2, title: '限定数字皮肤：太空勇士', cost: 200, icon: Star, color: 'bg-purple-100 text-purple-600' },
    { id: 3, title: '官方抓取模块配件', cost: 1000, icon: Gift, color: 'bg-orange-100 text-orange-600' },
  ];

  const familyRewards = [
    { id: 1, title: '额外的游戏时间 (30分钟)', cost: 50, icon: Zap, color: 'bg-green-100 text-green-600' },
    { id: 2, title: '选择晚餐的权利', cost: 100, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, title: '一次周末出游', cost: 500, icon: Gift, color: 'bg-pink-100 text-pink-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">积分中心</h1>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold opacity-90">总积分</h3>
            <Award className="opacity-80" size={24} />
          </div>
          <div className="text-4xl font-bold mb-2">{currentUser.points}</div>
          <p className="text-sm opacity-75">继续加油，获取更多奖励！</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">官方激励积分</h3>
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Star size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{currentUser.officialPoints}</div>
          <p className="text-sm text-gray-500">用于兑换官方礼品和权益</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">家庭激励积分</h3>
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <HeartIcon size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{currentUser.familyPoints}</div>
          <p className="text-sm text-gray-500">用于兑换家庭内部奖励</p>
        </div>
      </div>

      {/* Rewards Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Official Rewards */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="mr-2 text-blue-500" size={24} />
            官方奖励兑换
          </h2>
          <div className="space-y-4">
            {officialRewards.map((reward) => (
              <div key={reward.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${reward.color}`}>
                    <reward.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{reward.cost} 积分</p>
                  </div>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentUser.officialPoints >= reward.cost 
                      ? 'bg-primary text-white hover:bg-indigo-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={currentUser.officialPoints < reward.cost}
                >
                  兑换
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Family Rewards */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <HeartIcon className="mr-2 text-green-500" size={24} />
            家庭奖励兑换
          </h2>
          <div className="space-y-4">
            {familyRewards.map((reward) => (
              <div key={reward.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${reward.color}`}>
                    <reward.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{reward.cost} 积分</p>
                  </div>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentUser.familyPoints >= reward.cost 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={currentUser.familyPoints < reward.cost}
                >
                  兑换
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for Heart Icon since I missed importing it or renaming it
const HeartIcon = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default PointsCenter;
