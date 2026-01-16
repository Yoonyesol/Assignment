import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingList = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all'); // all, upcoming, completed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">온라인 미팅</h1>
          <p className="text-gray-600 mt-1">가맹계약 화상 회의 및 정기 교육 일정을 한눈에 관리하세요.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">일정 내보내기</span>
          </button>
          <button 
            onClick={() => navigate('/hq/contract/request')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>새 미팅 예약</span>
          </button>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
            {['all', 'upcoming', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentTab === tab 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'all' && '전체'}
                {tab === 'upcoming' && '예정됨'}
                {tab === 'completed' && '완료됨'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="회의명, 가맹점, 담당자 검색" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">회의 정보</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">참여자</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">화상회의 링크</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <MeetingRow 
                title="강남역점 신규 가맹 계약 체결" 
                type="계약"
                date="2024.03.20" 
                time="14:00 - 15:00" 
                status="upcoming" 
                participants={['김철수', '홍길동 (점주)']} 
                meetingId="842-129-304"
                onJoin={() => navigate('/meeting/842-129-304')}
              />
              <MeetingRow 
                title="성수점 Q2 운영 매뉴얼 교육" 
                type="교육"
                date="2024.03.21" 
                time="10:00 - 11:30" 
                status="pending" 
                participants={['김철수', '이영희 (점주)']} 
                meetingId="192-384-552"
              />
              <MeetingRow 
                title="홍대점 계약 갱신 미팅" 
                type="계약"
                date="2024.03.18" 
                time="16:00 - 17:00" 
                status="completed" 
                participants={['김철수', '박철수 (점주)']} 
                meetingId="556-221-889"
                isCompleted
              />
               <MeetingRow 
                title="부산 서면점 초기 상담" 
                type="상담"
                date="2024.03.25" 
                time="13:00 - 14:00" 
                status="upcoming" 
                participants={['이민호', '최지우 (예비점주)']} 
                meetingId="774-123-998"
              />
               <MeetingRow 
                title="전 가맹점 위생 교육 (3월)" 
                type="교육"
                date="2024.03.28" 
                time="09:00 - 11:00" 
                status="upcoming" 
                participants={['본사 교육팀', '전체 점주']} 
                meetingId="999-888-777"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            총 <span className="font-medium text-gray-900">5</span>개의 미팅이 있습니다.
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetingRow = ({ title, type, date, time, status, participants, meetingId, onJoin, isCompleted }: any) => {
  const statusConfig = {
    upcoming: { label: '예정됨', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-600' },
    pending: { label: '대기중', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-600' },
    completed: { label: '완료됨', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-500' },
  } as const;

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="py-4 px-6 align-top">
        <div className="flex items-start gap-3">
          <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${currentStatus.dot}`} />
          <div>
            <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              {title}
              <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600 border border-gray-200 font-normal">
                {type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 align-top">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.text}`}>
          {currentStatus.label}
        </span>
      </td>
      <td className="py-4 px-6 align-top">
        <div className="flex -space-x-2 overflow-hidden">
          {participants.map((p: string, i: number) => (
            <div 
              key={i} 
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600"
              title={p}
            >
              {p[0]}
            </div>
          ))}
          {participants.length > 3 && (
            <div className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500">
              +{participants.length - 3}
            </div>
          )}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {participants[0]} 외 {participants.length - 1}명
        </div>
      </td>
      <td className="py-4 px-6 align-top">
        <div className="flex items-center gap-2 mb-1">
          <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-600">
            {meetingId}
          </code>
          <button className="text-gray-400 hover:text-blue-600 transition-colors" title="아이디 복사">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-xs">
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            링크 복사
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-4 px-6 align-top text-right">
        <div className="flex items-center justify-end gap-2">
          {!isCompleted && (
            <button 
              onClick={onJoin}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors"
            >
              참가
            </button>
          )}
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MeetingList;
