import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Video, 
  Calendar, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Copy,
  ExternalLink,
  X,
  UserPlus,
  FileText,
  Upload,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface User {
  id: number;
  name: string;
  role: string;
}

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

const MOCK_USERS: User[] = [
  { id: 1, name: '김철수', role: '본사 관리자' },
  { id: 2, name: '홍길동', role: '강남점 점주' },
  { id: 3, name: '이영희', role: '성수점 점주' },
  { id: 4, name: '박철수', role: '홍대점 점주' },
  { id: 5, name: '최지우', role: '부산서면점 점주' },
  { id: 6, name: '정민수', role: '대구동성로점 점주' },
];

const MeetingList = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('all'); // all, upcoming, completed
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock Data
  const meetings: Meeting[] = [
    {
      id: '1',
      title: "강남역점 신규 가맹 계약 체결", 
      type: "계약",
      date: "2024.03.20", 
      time: "14:00 - 15:00", 
      status: "upcoming", 
      participants: ['김철수', '홍길동'], 
      meetingId: "842-129-304"
    },
    {
      id: '2',
      title: "성수점 Q2 운영 매뉴얼 교육", 
      type: "교육",
      date: "2024.03.21", 
      time: "10:00 - 11:30", 
      status: "upcoming", 
      participants: ['김철수', '이영희'], 
      meetingId: "192-384-552"
    },
    {
      id: '3',
      title: "홍대점 계약 갱신 미팅", 
      type: "계약",
      date: "2024.03.18", 
      time: "16:00 - 17:00", 
      status: "completed", 
      participants: ['김철수', '박철수'], 
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
          <p className="text-gray-600 mt-1">가맹계약 화상 회의 및 정기 교육 일정을 한눈에 관리하세요.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">일정 내보내기</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>새 미팅 만들기</span>
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
        <div className="overflow-x-auto min-h-[400px]">
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

      {/* Create Meeting Modal */}
      {isCreateModalOpen && (
        <CreateMeetingModal onClose={() => setIsCreateModalOpen(false)} />
      )}
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
        <div className="flex -space-x-2 overflow-hidden">
          {participants.map((p, i) => (
            <div 
              key={i} 
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600"
              title={p}
            >
              {p[0]}
            </div>
          ))}
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
                    <>
                      <button className="w-full text-left flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50">
                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                        교육 자료 다운로드
                      </button>
                       <button className="w-full text-left flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50">
                        미팅 취소
                      </button>
                    </>
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



const CreateMeetingModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const toggleUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
      } else {
        alert('PDF 파일만 업로드 가능합니다.');
      }
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Increased z-index to ensure it sits on top of everything including sidebar/header */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="border-b border-gray-200 p-5 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">새 미팅 만들기</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">회의 이름</label>
            <input 
              type="text" 
              placeholder="예: 2분기 가맹점 정기 교육" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
              <input 
                type="time" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-600"
              />
            </div>
          </div>

          {/* Participants Selection */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">참가자 선택</label>
            <div 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[42px] flex items-center flex-wrap gap-2 cursor-pointer bg-white"
              onClick={() => setShowUserSelect(!showUserSelect)}
            >
              {selectedUsers.length === 0 && <span className="text-gray-400 text-sm">참가자를 선택해주세요</span>}
              {selectedUsers.map(id => {
                const user = MOCK_USERS.find(u => u.id === id);
                return (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                    {user?.name}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleUser(id); }}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              <div className="ml-auto">
                 <UserPlus className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Dropdown List */}
            {showUserSelect && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {MOCK_USERS.map(user => (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    onClick={() => toggleUser(user.id)}
                  >
                    <div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                      <span className="text-gray-500 ml-2 text-xs">({user.role})</span>
                    </div>
                    {selectedUsers.includes(user.id) && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">교육 자료 (PDF)</label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                className="hidden" 
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                {uploadedFile ? (
                  <>
                     <FileText className="w-8 h-8 text-blue-500 mb-2" />
                     <span className="text-sm font-medium text-gray-900">{uploadedFile.name}</span>
                     <span className="text-xs text-gray-500 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">클릭하여 PDF 파일 업로드</span>
                    <span className="text-xs text-gray-400 mt-1">최대 10MB</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedUsers.length === 0}
            onClick={() => {
              alert('미팅이 생성되었습니다.');
              onClose();
            }}
          >
            미팅 생성
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MeetingList;
