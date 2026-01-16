import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Eye,
  MoreHorizontal,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// HQ Side: Manage Disclosures (Upload & List)
const DisclosureManage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">정보공개서 관리</h1>
          <p className="text-gray-600 mt-1">가맹점주에게 공개되는 정보공개서를 등록하고 열람 현황을 관리합니다.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>새 정보공개서 등록</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        
        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="문서 제목 검색"
            />
          </div>
          
           <div className="flex gap-2">
            <select className="border-gray-300 rounded-lg text-sm text-gray-600 py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>전체 연도</option>
              <option>2024년</option>
              <option>2023년</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible min-h-[300px]"> 
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[40%]">문서명</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">열람 현황</th>
                <th className="py-4 pr-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <DisclosureRow 
                title="2024년 정기 정보공개서" 
                date="2024.03.01" 
                total={120}
                read={85}
              />
              <DisclosureRow 
                title="2024년 1분기 정보공개서 변경사항 안내" 
                date="2024.01.15" 
                total={118}
                read={112}
              />
              <DisclosureRow 
                title="2023년 정기 정보공개서" 
                date="2023.03.01" 
                total={110}
                read={110}
                isCompleted
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 p-4 bg-gray-50/30 flex items-center justify-between">
           <div className="text-sm text-gray-500">총 <span className="font-medium text-gray-900">3</span>건</div>
           <div className="flex items-center gap-1">
             <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-400 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-medium text-sm">1</button>
             <button className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-600"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}
    </div>
  );
};

const DisclosureRow = ({ title, date, total, read, isCompleted }: any) => {
  const percentage = Math.round((read / total) * 100);
  
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-6 align-top">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-gray-900 mb-1">{title}</div>
            <div className="text-xs text-gray-500">PDF 문서 (12.5 MB)</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 align-top text-sm text-gray-600">
         {date}
      </td>
      <td className="py-4 px-6 align-top">
        <div className="w-full max-w-[140px]">
           <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-gray-700">{percentage}% 열람</span>
              <span className="text-gray-500">{read}/{total}</span>
           </div>
           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-600'}`} 
                style={{ width: `${percentage}%` }} 
              />
           </div>
           {isCompleted && (
             <div className="mt-1 flex items-center gap-1 text-[10px] text-green-600 font-medium">
               <CheckCircle className="w-3 h-3" />
               완료됨
             </div>
           )}
        </div>
      </td>
      <td className="py-4 pr-6 align-top text-right">
        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
           <MoreHorizontal className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

const UploadModal = ({ onClose }: { onClose: () => void }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="border-b border-gray-200 p-5 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">정보공개서 등록</h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">문서 제목</label>
            <input 
              type="text" 
              placeholder="예: 2024년 정기 정보공개서" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">파일 업로드</label>
              <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="disclosure-upload"
                />
                <label htmlFor="disclosure-upload" className="cursor-pointer flex flex-col items-center">
                  {uploadedFile ? (
                    <>
                       <FileText className="w-10 h-10 text-blue-500 mb-2" />
                       <span className="text-sm font-medium text-gray-900">{uploadedFile.name}</span>
                       <span className="text-xs text-gray-500 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-600">클릭하여 PDF 업로드</span>
                      <span className="text-xs text-gray-400 mt-1">최대 50MB</span>
                    </>
                  )}
                </label>
              </div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg flex gap-3 items-start">
             <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <div className="text-xs text-blue-800 leading-relaxed">
               <p className="font-semibold mb-1">등록 전 확인해주세요</p>
               등록된 정보공개서는 모든 가맹점주에게 즉시 공개되며, 알림이 발송됩니다. 내용에 오류가 없는지 다시 한번 확인해주세요.
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
            onClick={() => { alert('정보공개서가 등록되었습니다.'); onClose(); }}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DisclosureManage;
