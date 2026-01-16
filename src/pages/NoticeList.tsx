import { useState } from 'react';
import { 
  Search, 
  Megaphone, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Pin
} from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  isImportant?: boolean;
  type: string;
}

const NoticeList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const notices: Notice[] = [
    {
      id: 1,
      title: "[필독] 2024년 상반기 가맹점 운영 정책 변경 안내",
      author: "본사 운영팀",
      date: "2024.03.15",
      views: 1250,
      isImportant: true,
      type: "중요"
    },
    {
      id: 2,
      title: "개인정보 처리방침 개정 안내 (2024.04.01 시행)",
      author: "법무팀",
      date: "2024.03.10",
      views: 850,
      isImportant: true,
      type: "공지"
    },
    {
      id: 3,
      title: "4월 신메뉴 출시 프로모션 가이드",
      author: "마케팅팀",
      date: "2024.03.20",
      views: 420,
      type: "마케팅"
    },
    {
      id: 4,
      title: "시스템 정기 점검 안내 (3/25 02:00 ~ 06:00)",
      author: "IT지원팀",
      date: "2024.03.18",
      views: 310,
      type: "시스템"
    },
    {
      id: 5,
      title: "우수 가맹점 선정 결과 및 시상 안내",
      author: "본사 운영팀",
      date: "2024.03.05",
      views: 980,
      type: "소식"
    },
    {
      id: 6,
      title: "봄맞이 매장 대청소 체크리스트 배포",
      author: "QSV팀",
      date: "2024.03.02",
      views: 550,
      type: "운영"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
        <p className="text-gray-600 mt-1">본사의 주요 공지사항과 업데이트 소식을 확인하세요.</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        
        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           {/* Search */}
           <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="제목, 작성자 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select className="border-gray-300 rounded-lg text-sm text-gray-600 py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>전체 카테고리</option>
              <option>중요</option>
              <option>운영</option>
              <option>마케팅</option>
              <option>시스템</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">번호</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">제목</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">작성자</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">등록일</th>
                <th className="py-4 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.map((notice) => (
                <tr key={notice.id} className={`hover:bg-gray-50 transition-colors cursor-pointer ${notice.isImportant ? 'bg-blue-50/30' : ''}`}>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {notice.isImportant ? (
                      <Pin className="w-4 h-4 text-red-500 fill-current" />
                    ) : (
                      notice.id
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       {notice.isImportant && (
                         <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold">
                           {notice.type}
                         </span>
                       )}
                       {!notice.isImportant && (
                          <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">
                            {notice.type}
                          </span>
                       )}
                       <span className={`text-sm font-medium ${notice.isImportant ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                         {notice.title}
                       </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{notice.author}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{notice.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 text-center">{notice.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 bg-gray-50/30 flex items-center justify-between">
           <div className="text-sm text-gray-500">총 <span className="font-medium text-gray-900">{notices.length}</span>개의 공지사항</div>
           <div className="flex items-center gap-1">
             <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-400 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-medium text-sm">1</button>
             <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-600"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default NoticeList;
