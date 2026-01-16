import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Video, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Copy,
  ExternalLink,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Meeting {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
  participants: string[];
  meetingId: string;
}

const MeetingList = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all'); // all, upcoming, completed

  // Mock Data (For Franchisee View)
  const meetings: Meeting[] = [
    {
      id: '1',
      title: "강남역점 신규 가맹 계약 체결", 
      type: "계약",
      date: "2024.03.20", 
      time: "14:00 - 15:00", 
      status: "upcoming", 
      participants: ['김철수(본사)', '홍길동(나)'], 
      meetingId: "842-129-304"
    },
    {
      id: '2',
      title: "2024 Q1 정기 가맹점주 교육", 
      type: "교육",
      date: "2024.03.21", 
      time: "10:00 - 11:30", 
      status: "upcoming", 
      participants: ['교육팀장', '전체 점주'], 
      meetingId: "192-384-552"
    },
    {
      id: '3',
      title: "개인정보 처리 방침 변경 안내", 
      type: "안내",
      date: "2024.03.10", 
      time: "16:00 - 16:30", 
      status: "completed", 
      participants: ['법무팀', '홍길동(나)'], 
      meetingId: "556-221-889"
    }
  ];

  const filteredMeetings = meetings.filter(m => {
    if (currentTab === 'all') return true;
    return m.status === currentTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">온라인 미팅</h1>
          <p className="text-gray-600 mt-1">예정된 화상 회의 및 교육 일정을 확인하세요.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">일정 내보내기</span>
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
                placeholder="회의명 검색" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">회의 정보</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">참여자</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">링크</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMeetings.map((meeting) => (
                <MeetingRow 
                  key={meeting.id}
                  {...meeting}
                  onJoin={() => navigate(`/meeting/${meeting.meetingId}`)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            총 <span className="font-medium text-gray-900">{filteredMeetings.length}</span>개의 미팅이 있습니다.
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

const MeetingRow = ({ title, type, date, time, status, participants, meetingId, onJoin }: Meeting & { onJoin?: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const statusConfig = {
    upcoming: { label: '예정됨', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-600' },
    completed: { label: '완료됨', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-500' },
  } as const;

  const currentStatus = statusConfig[status];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="text-sm text-gray-600">
          {participants.join(', ')}
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
      </td>
      <td className="py-4 px-6 align-top text-right">
        <div className="flex items-center justify-end gap-2 relative">
          {status === 'upcoming' && (
            <button 
              onClick={onJoin}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors"
            >
              참가
            </button>
          )}
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20 focus:outline-none animate-in fade-in zoom-in-95 duration-100 text-left">
                <div className="py-1">
                  {status === 'completed' ? (
                    <>
                      <button className="w-full text-left flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <Video className="mr-2 h-4 w-4 text-blue-500" />
                        녹화본 다운로드
                      </button>
                      <button className="w-full text-left flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                        회의록 다운로드
                      </button>
                    </>
                  ) : (
                    <button className="w-full text-left flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">
                      <FileText className="mr-2 h-4 w-4 text-gray-500" />
                      교육 자료 다운로드
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MeetingList;
