import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Bot, 
  Info,
  Building,
  Hash,
  Share2
} from 'lucide-react';

const ContractDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock Data - In a real app, fetch based on ID
  const contractData = {
    id: "CTR-20240315-001",
    title: "강남역점 가맹 계약서 (2024년 갱신)",
    storeName: "강남역점",
    storeCode: "00ej12euye",
    status: "completed", // completed, pending, review
    createdDate: "2024.03.10 10:00",
    completedDate: "2024.03.15 14:30",
    scheduledDate: "2024.03.15 14:00",
    participants: [
      { name: "김철수", role: "본사 담당자", team: "가맹운영팀" },
      { name: "홍길동", role: "점주", team: "강남역점" }
    ],
    aiAnalysis: {
      summary: "표준 가맹계약서(2023 개정안)를 준수하고 있습니다. 특약 사항으로 영업 지역 보호 범위가 반경 500m로 설정되었습니다.",
      riskLevel: "Low",
      keywords: ["영업지역", "계약갱신", "위약금"]
    }
  };

  const statusConfig = {
    completed: { text: '체결 완료', color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle2 },
    pending: { text: '서명 대기', color: 'text-yellow-700 bg-yellow-50 border-yellow-200', icon: Clock },
    review: { text: '검토 중', color: 'text-purple-700 bg-purple-50 border-purple-200', icon: FileText },
  };

  const currentStatus = statusConfig[contractData.status as keyof typeof statusConfig];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               {contractData.title}
             </h1>
             <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                <span className="font-mono">{contractData.id}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{contractData.storeName}</span>
             </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Share2 className="w-4 h-4" />
              공유
           </button>
           <button 
             onClick={() => alert('계약서를 다운로드합니다.')}
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 shadow-sm transition-colors"
           >
              <Download className="w-4 h-4" />
              다운로드
           </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Left: PDF Viewer (Mock) */}
        <div className="lg:col-span-2 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden flex flex-col items-center justify-start p-8 overflow-y-auto custom-scrollbar relative">
           <div className="absolute top-4 right-4 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border shadow-sm ${currentStatus.color}`}>
                <StatusIcon className="w-4 h-4" />
                {currentStatus.text}
              </span>
           </div>
           
           {/* A4 Paper Look */}
           <div className="bg-white w-full max-w-[700px] min-h-[1000px] shadow-lg p-12 text-slate-800">
              <div className="border-b-2 border-slate-800 pb-4 mb-8">
                 <h2 className="text-3xl font-serif font-bold text-center">가맹 계약서</h2>
                 <p className="text-center text-slate-500 mt-2 font-serif">Franchise Agreement</p>
              </div>
              
              <div className="space-y-6 font-serif leading-relaxed text-sm text-justify">
                <p>
                  <strong>제1조 (목적)</strong><br/>
                  본 계약은 가맹본부(이하 "갑")와 가맹점사업자(이하 "을") 간의 공정한 가맹사업 거래 질서를 정착시키고, 상호 대등한 지위에서 균형 있는 발전을 도모하기 위하여 필요한 사항을 정함을 목적으로 한다.
                </p>
                <div className="p-4 bg-gray-50 border-l-2 border-gray-300 text-xs text-gray-600 my-4 italic">
                   서명 완료됨: 2024.03.15 14:30 (IP: 192.168.0.1)
                </div>

                <p>
                  <strong>제2조 (영업표지의 사용권 부여)</strong><br/>
                  1. "갑"은 "을"에게 본 계약기간 동안 지정된 영업장소에서 "갑"의 영업표지를 사용하여 가맹점을 운영할 수 있는 권리를 부여한다.<br/>
                  2. "을"은 "갑"의 영업표지를 가맹점 운영 목적 이외의 용도로 사용하여서는 아니 된다.
                </p>
                
                <p>
                  <strong>제3조 (영업활동의 범위)</strong><br/>
                   "을"은 본 계약 체결 시 정한 영업지역 내에서만 영업활동을 할 수 있으며, 구체적인 영업지역의 범위는 [별첨1]과 같다.
                </p>

                {/* Simulated Content */}
                {Array.from({length: 10}).map((_, i) => (
                  <p key={i} className="text-gray-300 select-none">
                    (계약 내용이 계속 이어집니다... 데이터 보안을 위해 실제 내용은 생략되었습니다. 문서 뷰어 예시입니다.)<br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                ))}
              </div>
              
              <div className="mt-16 flex justify-between items-end">
                 <div className="text-center">
                    <p className="mb-4 font-bold">가맹본부 (갑)</p>
                    <div className="w-32 h-16 border-b border-slate-400 flex items-center justify-center relative">
                        <img src="https://via.placeholder.com/100x50?text=Signature" alt="Signature" className="opacity-50" />
                        <div className="absolute font-script text-2xl text-blue-900 transform -rotate-6">Doldari HQ</div>
                    </div>
                 </div>
                 <div className="text-center">
                    <p className="mb-4 font-bold">가맹점사업자 (을)</p>
                    <div className="w-32 h-16 border-b border-slate-400 flex items-center justify-center relative">
                        <div className="absolute font-script text-2xl text-black transform -rotate-3">Hong.G.D</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Sidebar Info */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto custom-scrollbar pr-1">
           
           {/* AI Analysis Card */}
           <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-2 mb-3">
               <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">
                 <Bot className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-indigo-900">AI 계약 분석</h3>
             </div>
             <p className="text-sm text-indigo-800 leading-relaxed mb-4">
               {contractData.aiAnalysis.summary}
             </p>
             <div className="flex flex-wrap gap-2">
                {contractData.aiAnalysis.keywords.map(k => (
                  <span key={k} className="px-2 py-1 bg-white/60 text-indigo-700 text-xs font-semibold rounded border border-indigo-200">
                    #{k}
                  </span>
                ))}
             </div>
           </div>

           {/* Contract Info */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg mb-2">계약 정보</h3>
              
              <InfoRow icon={<Hash className="w-4 h-4" />} label="계약 ID" value={contractData.id} />
              <InfoRow icon={<Building className="w-4 h-4" />} label="가맹점" value={contractData.storeName} />
              
              <div className="py-2 border-t border-gray-100 space-y-3">
                 <InfoRow icon={<Calendar className="w-4 h-4" />} label="미팅 예정" value={contractData.scheduledDate} />
                 <InfoRow icon={<CheckCircle2 className="w-4 h-4" />} label="체결 완료" value={contractData.completedDate} isHighlight />
              </div>
           </div>

           {/* Participants */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 text-lg mb-4">참여자 정보</h3>
              <div className="space-y-4">
                 {contractData.participants.map((p, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="font-bold text-gray-900">{p.name}</div>
                         <div className="text-xs text-gray-500">{p.role} · {p.team}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, isHighlight }: any) => (
  <div className="flex items-center justify-between">
     <div className="flex items-center gap-2 text-gray-500 text-sm">
       {icon}
       <span>{label}</span>
     </div>
     <div className={`text-sm font-medium ${isHighlight ? 'text-blue-600' : 'text-gray-900'}`}>
       {value}
     </div>
  </div>
);

export default ContractDetail;
