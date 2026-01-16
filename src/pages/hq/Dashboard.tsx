import React from 'react';
import { Users, FileCheck, Video, TrendingUp, Calendar, Bell, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">안녕하세요, 김철수 팀장님 👋</h1>
          <p className="text-sm text-gray-600">오늘의 가맹 관리 현황입니다.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<Users className="w-5 h-5 text-blue-600" />}
            label="활성 가맹점"
            value="124"
            change="+3"
            changeType="increase"
          />
          <StatCard 
            icon={<FileCheck className="w-5 h-5 text-green-600" />}
            label="진행 중인 계약"
            value="8"
            change="+2"
            changeType="increase"
          />
          <StatCard 
            icon={<Video className="w-5 h-5 text-orange-600" />}
            label="오늘 예정 미팅"
            value="4"
          />
          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
            label="이번 달 매출"
            value="₩2.4B"
            change="+12%"
            changeType="increase"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Franchisees */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">최근 가맹점 업데이트</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  전체보기
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">지점명</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">점주명</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">계약 상태</th>
                      <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">최근 방문</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FranchiseeRow 
                      name="강남역점" 
                      owner="홍길동" 
                      status="정상" 
                      lastVisit="2024.03.10"
                      statusColor="green"
                    />
                    <FranchiseeRow 
                      name="성수점" 
                      owner="이영희" 
                      status="갱신예정" 
                      lastVisit="2024.03.12"
                      statusColor="yellow"
                    />
                    <FranchiseeRow 
                      name="홍대점" 
                      owner="박철수" 
                      status="정상" 
                      lastVisit="2024.03.08"
                      statusColor="green"
                    />
                    <FranchiseeRow 
                      name="여의도점" 
                      owner="최민지" 
                      status="주의" 
                      lastVisit="2024.03.15"
                      statusColor="red"
                    />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Service Access */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">주요 연동 서비스 바로가기</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ServiceCard icon="📊" name="통계 보고서" />
                <ServiceCard icon="📄" name="계약서 작성" />
                <ServiceCard icon="💬" name="메시징" />
                <ServiceCard icon="🎯" name="AI 분석" />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Meetings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">오늘의 미팅</h3>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3">
                <MeetingCard 
                  time="14:00" 
                  title="신규 가맹 계약 (판교점)" 
                  type="계약"
                  color="blue"
                />
                <MeetingCard 
                  time="15:30" 
                  title="Q2 프로모션 교육" 
                  type="교육"
                  color="green"
                />
                <MeetingCard 
                  time="17:00" 
                  title="정기 점검 미팅 (성수점)" 
                  type="점검"
                  color="orange"
                />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
              <div className="space-y-4">
                <ActivityItem 
                  icon={<Bell className="w-4 h-4 text-blue-600" />}
                  text="새로운 가맹점 신청이 도착했습니다"
                  time="10분 전"
                />
                <ActivityItem 
                  icon={<FileCheck className="w-4 h-4 text-green-600" />}
                  text="판교점 계약서가 승인되었습니다"
                  time="1시간 전"
                />
                <ActivityItem 
                  icon={<Calendar className="w-4 h-4 text-purple-600" />}
                  text="내일 3개의 미팅이 예정되어 있습니다"
                  time="2시간 전"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, changeType }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      {change && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          changeType === 'increase' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

interface FranchiseeRowProps {
  name: string;
  owner: string;
  status: string;
  lastVisit: string;
  statusColor: 'green' | 'yellow' | 'red';
}

const FranchiseeRow: React.FC<FranchiseeRowProps> = ({ name, owner, status, lastVisit, statusColor }) => {
  const colorMap = {
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-3 px-2 text-sm font-medium text-gray-900">{name}</td>
      <td className="py-3 px-2 text-sm text-gray-600">{owner}</td>
      <td className="py-3 px-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colorMap[statusColor]}`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-2 text-sm text-gray-500">{lastVisit}</td>
    </tr>
  );
};

const ServiceCard: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg 
                   hover:border-blue-300 hover:bg-blue-50 transition-all group">
    <span className="text-2xl">{icon}</span>
    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">{name}</span>
  </button>
);

interface MeetingCardProps {
  time: string;
  title: string;
  type: string;
  color: 'blue' | 'green' | 'orange';
}

const MeetingCard: React.FC<MeetingCardProps> = ({ time, title, type, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
  };

  return (
    <div className={`p-3 rounded-lg border ${colorMap[color]}`}>
      <div className="flex items-start gap-3">
        <div className="text-center min-w-[50px]">
          <div className="text-sm font-bold text-gray-900">{time}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 mb-1 truncate">{title}</div>
          <div className="text-xs text-gray-600">{type}</div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ icon: React.ReactNode; text: string; time: string }> = ({ icon, text, time }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900">{text}</p>
      <p className="text-xs text-gray-500 mt-0.5">{time}</p>
    </div>
  </div>
);

export default Dashboard;
