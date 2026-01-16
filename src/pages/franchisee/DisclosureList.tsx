import { useState } from 'react';
import { 
  Search, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const DisclosureList = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">정보공개서 확인</h1>
        <p className="text-gray-600 mt-1">본사에서 등록한 정보공개서를 열람하고 확인할 수 있습니다.</p>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        
        {/* Filters Section */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="문서 검색"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select className="border-gray-300 rounded-lg text-sm text-gray-600 py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>최신순</option>
              <option>과거순</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible min-h-[300px]"> 
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[50%]">문서명</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">등록일시</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">열람상태</th>
                <th className="py-4 pr-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <DisclosureRow 
                title="2024년 정기 정보공개서" 
                date="2024.03.01 09:00" 
                isRead={false}
                isNew
              />
              <DisclosureRow 
                title="2024년 1분기 정보공개서 변경사항 안내" 
                date="2024.01.15 14:20" 
                isRead={true}
                readDate="2024.01.16 10:30"
              />
              <DisclosureRow 
                title="2023년 정기 정보공개서" 
                date="2023.03.01 09:00" 
                isRead={true}
                readDate="2023.03.05 11:00"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 bg-gray-50/30 flex items-center justify-between">
          <div className="text-sm text-gray-500">총 <span className="font-medium text-gray-900">3</span>건</div>
          
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

const DisclosureRow = ({ title, date, isRead, isNew, readDate }: any) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 align-top">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="font-medium text-gray-900">{title}</span>
               {isNew && (
                 <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">NEW</span>
               )}
            </div>
            <div className="text-xs text-gray-500">본사 법무팀 등록</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 align-top">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
           <Calendar className="w-3.5 h-3.5" />
           {date}
        </div>
      </td>
      <td className="py-4 px-6 align-top">
        {isRead ? (
           <div className="flex flex-col">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle className="w-4 h-4" />
                열람 완료
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {readDate} 확인
              </span>
           </div>
        ) : (
           <span className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
             <AlertCircle className="w-4 h-4" />
             미열람
           </span>
        )}
      </td>
      <td className="py-4 pr-6 align-top text-right">
        <button 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors shadow-sm"
          onClick={() => alert('정보공개서를 다운로드하고 열람 처리합니다.')}
        >
          {isRead ? (
            <>
              <Download className="w-3.5 h-3.5" />
              다운로드
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              확인하기
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

export default DisclosureList;
