import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MoreHorizontal,
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronDown,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Video,
  FileDown
} from 'lucide-react';

const ContractManage = () => {
  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">내 계약 관리</h1>
          <p className="text-gray-600 mt-1">체결된 가맹 계약 및 관련 문서를 확인하고 관리합니다.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>전체 다운로드</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        
        {/* Filters Section */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Search Input */}
            <div className="flex-[2] min-w-[240px]">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">검색어</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  placeholder="문서 제목 검색"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">기간</label>
              <div className="relative">
                <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>전체 기간</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">진행 상태</label>
              <div className="relative">
                <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span>모든 상태</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
               <span className="text-sm text-gray-500">총 <strong className="text-gray-900">3</strong>건의 문서가 있습니다.</span>
            </div>
            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              필터 초기화
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible min-h-[400px]"> 
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-4 pl-6 pr-4 w-10">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[50%]">문서명</th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">체결 일시</th>
                <th className="py-4 pr-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <ContractRow 
                title="강남역점 가맹 계약서 (2024년 갱신)" 
                label="중요"
                status="completed" 
                date="2024.03.15 14:30" 
              />
              <ContractRow 
                title="개인정보 처리 방침 동의서" 
                status="completed" 
                date="2024.03.15 14:35" 
              />
              <ContractRow 
                title="운영 매뉴얼 준수 서약서" 
                status="completed" 
                date="2024.03.15 14:40" 
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="border-gray-300 rounded-lg text-sm text-gray-600 py-1.5 focus:ring-blue-500 focus:border-blue-500">
              <option>10개씩 보기</option>
              <option>20개씩 보기</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-400 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-medium text-sm">
              1
            </button>
            <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContractRow = ({ title, label, status, date }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusConfig = {
    completed: { text: '체결 완료', color: 'text-green-600', icon: CheckCircle2 },
    pending: { text: '서명 대기', color: 'text-yellow-600', icon: Clock },
    review: { text: '검토 중', color: 'text-purple-600', icon: FileText },
    draft: { text: '초안', color: 'text-gray-500', icon: FileText },
  } as const;

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  const StatusIcon = currentStatus.icon;

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

  const handleDocumentClick = () => {
    alert(`[${title}] 문서 상세보기를 엽니다.`);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 pl-6 pr-4 align-top">
         <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1" />
      </td>
      <td className="py-4 px-4 align-top">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={handleDocumentClick}>
               {title}
             </span>
             {label && (
               <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                 label === '중요' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-600 border-gray-200'
               }`}>
                 {label}
               </span>
             )}
          </div>
          <div 
            className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer hover:text-blue-600 transition-colors w-fit"
            onClick={handleDocumentClick}
          >
            <div className="p-1 rounded hover:bg-blue-50">
               <FileText className="w-3 h-3" />
            </div>
            <span>PDF 문서</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 align-top">
        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${currentStatus.color}`}>
          <StatusIcon className="w-4 h-4" />
          {currentStatus.text}
        </span>
      </td>
      <td className="py-4 px-4 align-top">
        <span className="text-sm text-gray-500 flex items-center gap-1.5">
           {date}
           {status === 'pending' && (
             <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
           )}
        </span>
      </td>
      <td className="py-4 pr-6 align-top text-right">
        {/* Action Button & Dropdown */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button 
            type="button"
            className={`p-1.5 rounded-md transition-colors ${
              isDropdownOpen 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
              <div className="py-1">
                <button
                  className="w-full text-left flex items-center px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    alert('계약서를 다운로드합니다.');
                    setIsDropdownOpen(false);
                  }}
                >
                  <FileDown className="mr-3 h-4 w-4 text-gray-400" />
                  계약서 다운로드
                </button>
                {status === 'completed' && (
                  <button
                    className="w-full text-left flex items-center px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      alert('녹화본을 다운로드합니다.');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Video className="mr-3 h-4 w-4 text-blue-500" />
                    녹화본 다운로드
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ContractManage;
