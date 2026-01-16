import { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Video as VideoIcon, VideoOff, Monitor, MessageSquare, Users, 
  FileText, Shield, Download, CheckCircle, Info, X,
  PenTool, Fingerprint, Save, AlertTriangle, Clock, ChevronUp, MoreHorizontal, Smile, LogOut, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

type UserRole = 'HQ' | 'Franchisee';

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [userRole] = useState<UserRole>('HQ'); 
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showContract, setShowContract] = useState(true);
  
  // Signature States
  const [signatures, setSignatures] = useState<{id: number, x: number, y: number, type: 'sign' | 'stamp'}[]>([]);
  const [showSignModal, setShowSignModal] = useState(false);
  const [tempClickPos, setTempClickPos] = useState<{x: number, y: number} | null>(null);
  
  // Modal States
  const [showEndModal, setShowEndModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Time state for recording indicator (just visual)
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePdfClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTempClickPos({ x, y });
    setShowSignModal(true);
  };

  const addSignature = (type: 'sign' | 'stamp') => {
    if (tempClickPos) {
      setSignatures([...signatures, { 
        id: Date.now(), 
        x: tempClickPos.x, 
        y: tempClickPos.y, 
        type 
      }]);
    }
    setShowSignModal(false);
    setTempClickPos(null);
  };

  const handleExit = () => setShowEndModal(true);

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col text-white overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Zoom-like Top Bar (Auto-hides or subtle) */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 text-green-500 bg-[#1a1a1a]/80 px-2 py-1 rounded hover:bg-[#2a2a2a] cursor-pointer transition-colors">
            <Shield size={14} fill="currentColor" />
            <span className="text-xs font-medium text-gray-300">Meeting</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-2" />
          </div>
        </div>
        <div className="pointer-events-auto">
          <button className="text-xs bg-[#1a1a1a]/80 px-2 py-1 rounded text-gray-300 hover:text-white hover:bg-[#2a2a2a] transition-colors">
            보기
          </button>
        </div>
      </div>

      {/* Main Content Area - Zoom Side-by-side style */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Contract / Shared Screen Area */}
        {showContract ? (
          <div className="flex-1 flex bg-black">
             {/* Left: Contract (Screen Share) */}
             <div className="flex-1 relative flex items-center justify-center p-4 bg-gray-900/50">
                <div className="absolute top-4 bg-green-500 text-black px-3 py-1.5 rounded-b-md text-xs font-bold shadow-lg z-10 flex items-center gap-2">
                  <Monitor size={14} />
                  가맹계약서 화면 공유 중입니다
                </div>

                <div className="h-full w-full max-w-4xl bg-[#2a2a2a] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-gray-800">
                  {/* PDF Toolbar */}
                  <div className="h-10 bg-[#3a3a3a] flex items-center justify-between px-3 border-b border-gray-700">
                    <span className="text-xs font-semibold text-gray-300">가맹계약서.pdf</span>
                    <div className="flex gap-2">
                       <button className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white"><Download size={14}/></button>
                       <button onClick={() => setShowContract(false)} className="p-1 hover:bg-red-500/80 rounded text-gray-400 hover:text-white"><X size={14}/></button>
                    </div>
                  </div>
                  
                  {/* PDF Content */}
                  <div className="flex-1 overflow-y-auto relative bg-[#525659] p-4 custom-scrollbar">
                    <div 
                      className="bg-white mx-auto min-h-[1000px] w-full max-w-[800px] shadow-lg p-10 text-slate-800 relative cursor-crosshair origin-top transform transition-transform"
                      onClick={handlePdfClick}
                    >
                      {/* Identity Badge */}
                      <div className="absolute -right-2 top-10 bg-emerald-100 text-emerald-700 px-3 py-1 text-[10px] font-bold rounded-l-md border border-emerald-200 shadow-sm flex items-center gap-1 z-10">
                        <CheckCircle size={10} />
                        본인인증 완료
                      </div>

                      <h1 className="text-2xl font-bold text-center mb-8 border-b pb-4 border-slate-200 text-slate-900">가맹 계약서</h1>
                      <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-serif">
                        <p><strong>제 1조 (목적)</strong><br/>본 계약은 가맹본부(이하 "갑")와 가맹점사업자(이하 "을") 간의 공정한 가맹사업 거래 질서를 정착시키고... (생략)</p>
                        
                        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-900 text-xs my-4">
                           <strong className="block mb-1 text-blue-700 flex items-center gap-1"><Info size={12}/> AI 요약 설명</strong>
                           본 조항은 가맹점의 영업 지역 보호를 위한 조항입니다. 반경 500m 내 신규 출점을 제한합니다.
                        </div>

                        <p><strong>제 2조 (상표 사용권)</strong><br/>"을"은 "갑"의 상표를 계약 기간 동안 사용할 수 있는 비독점적 권리를 가지며...</p>
                        <p><strong>제 3조...</strong><br/>(계약서 내용이 계속됩니다...)</p>
                      </div>

                      {/* Signatures */}
                      {signatures.map(sig => (
                        <div 
                          key={sig.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                          style={{ left: sig.x, top: sig.y }}
                        >
                          {sig.type === 'sign' ? (
                            <div className="relative">
                               <div className="absolute inset-0 bg-yellow-200 opacity-20 transform -rotate-2 rounded-sm" />
                               <div className="text-3xl font-script text-black font-bold transform -rotate-6 filter drop-shadow-sm px-4 py-2 border border-black/10 bg-white/10">
                                 Kim.C.S
                               </div>
                               <div className="text-[8px] text-gray-400 mt-1 text-center font-mono tracking-tighter">Signed via DotContract</div>
                            </div>
                          ) : (
                             <div className="relative group">
                                <Fingerprint size={48} className="text-red-600 opacity-80" />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] whitespace-nowrap bg-gray-900 text-white px-1 rounded opacity-0 group-hover:opacity-100">지장 (본인인증됨)</div>
                             </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </div>

             {/* Right: Video Strip (Zoom Gallery View styled) */}
             <div className="w-[260px] bg-[#1a1a1a] border-l border-gray-800 flex flex-col p-2 gap-2 overflow-y-auto custom-scrollbar">
                <VideoFeed name="홍길동 (점주)" isRemote />
                <VideoFeed name="김철수 (본사)" isLocal isMuted={isMuted} isVideoOff={isVideoOff} />
             </div>
          </div>
        ) : (
          // Grid View (When no contract is shared)
          <div className="flex-1 grid grid-cols-2 bg-black p-4 gap-4 items-center justify-center">
             <div className="aspect-video w-full max-w-4xl mx-auto"><VideoFeed name="홍길동 (점주)" isRemote large /></div>
             <div className="aspect-video w-full max-w-4xl mx-auto"><VideoFeed name="김철수 (본사)" isLocal isMuted={isMuted} isVideoOff={isVideoOff} large /></div>
          </div>
        )}

      </div>

      {/* Zoom-like Bottom Control Bar */}
      <footer className="h-[72px] bg-[#1a1a1a] flex items-center justify-between px-4 z-30 select-none border-t border-[#333]">
        {/* Left: Audio/Video Settings */}
        <div className="flex items-center">
           <ControlGroup>
              <ZoomButton 
                icon={isMuted ? <MicOff /> : <Mic />} 
                label={isMuted ? "음소거 해제" : "음소거"} 
                isOn={!isMuted}
                onClick={() => setIsMuted(!isMuted)}
                hasDropdown
                isToggle
              />
              <ZoomButton 
                icon={isVideoOff ? <VideoOff /> : <VideoIcon />} 
                label={isVideoOff ? "비디오 시작" : "비디오 중지"} 
                isOn={!isVideoOff}
                onClick={() => setIsVideoOff(!isVideoOff)}
                hasDropdown
                isToggle
              />
           </ControlGroup>
        </div>

        {/* Center: Main Controls */}
        <div className="flex items-center gap-1 md:gap-3 absolute left-1/2 transform -translate-x-1/2">
           <ZoomButton k={1} icon={<Shield size={20}/>} label="보안" />
           <ZoomButton k={2} icon={<Users size={20}/>} label="참가자" badge={2} />
           <ZoomButton k={3} icon={<MessageSquare size={20}/>} label="채팅" />
           <ZoomButton 
              k={4} 
              icon={<FileText size={20}/>} 
              label="계약서 공유" 
              isOn={showContract}
              onClick={() => setShowContract(!showContract)}
              isHighlight
           />
           <ZoomButton k={5} icon={<Smile size={20}/>} label="반응" />
           <ZoomButton k={6} icon={<MoreHorizontal size={20}/>} label="더보기" />
        </div>

        {/* Right: End Meeting */}
        <div>
          <button 
            onClick={handleExit}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors"
          >
            {userRole === 'HQ' ? '종료' : '나가기'}
          </button>
        </div>
      </footer>

      {/* Signature Choice Modal - Zoom Style */}
      {showSignModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSignModal(false)}>
          <div className="bg-[#242424] text-white rounded-lg p-6 w-[360px] shadow-2xl border border-gray-700 transform transition-all scale-100" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-1">서명 방식 선택</h3>
              <p className="text-gray-400 text-sm">원하시는 서명 방식을 선택해주세요.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                onClick={() => addSignature('sign')}
                className="flex flex-col items-center justify-center gap-3 p-4 bg-[#333] hover:bg-[#444] rounded-lg transition-colors border border-gray-600 hover:border-gray-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform">
                  <PenTool size={24} />
                </div>
                <span className="text-sm">전자 서명</span>
              </button>
              <button 
                onClick={() => addSignature('stamp')}
                className="flex flex-col items-center justify-center gap-3 p-4 bg-[#333] hover:bg-[#444] rounded-lg transition-colors border border-gray-600 hover:border-gray-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-transform">
                  <Fingerprint size={24} />
                </div>
                <span className="text-sm">전자 지장</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* End Meeting Modal */}
      {showEndModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowEndModal(false)}>
           <div className="bg-white rounded-xl p-6 w-[400px] shadow-2xl text-slate-900 overflow-hidden relative" onClick={e => e.stopPropagation()}>
             {userRole === 'HQ' ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-gray-900">회의 종료 옵션</h3>
                <p className="text-sm text-gray-500 mb-6">계약 진행 상태에 따라 종료 방식을 선택하세요.</p>
                
                <div className="space-y-3">
                   {/* Option 1: Complete */}
                   <button 
                      onClick={() => { 
                        alert('전자 서명이 포함된 계약서가 저장되었습니다.\n계약 관리 페이지로 이동합니다.'); 
                        navigate('/hq/contract/manage'); 
                      }}
                      className="w-full p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 flex items-center gap-4 group text-left transition-all"
                   >
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                        <Save size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">계약 완료</div>
                        <div className="text-xs text-blue-600 font-medium">계약서 저장 및 완료 처리</div>
                      </div>
                   </button>

                   {/* Option 2: Hold */}
                   <button 
                      onClick={() => {
                        setShowEndModal(false);
                        setShowScheduleModal(true);
                      }}
                      className="w-full p-4 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-300 flex items-center gap-4 group text-left transition-all"
                   >
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">계약 보류 (재일정)</div>
                        <div className="text-xs text-orange-600 font-medium">다음 회의 일정 예약하기</div>
                      </div>
                   </button>

                   {/* Option 3: Discard */}
                   <button 
                      onClick={() => {
                        if (window.confirm('정말로 계약을 파기하시겠습니까?\n이 작업은 되돌릴 수 없으며 모든 회의 데이터가 삭제됩니다.')) {
                          alert('회의 데이터가 삭제되었습니다.');
                          navigate('/hq/dashboard');
                        }
                      }}
                      className="w-full p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-red-200 flex items-center gap-4 group text-left transition-all"
                   >
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 group-hover:bg-red-100 group-hover:text-red-500 transition-colors flex items-center justify-center shadow-sm">
                        <AlertTriangle size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">계약 파기</div>
                        <div className="text-xs text-gray-500 group-hover:text-red-400 transition-colors">데이터 삭제 및 나가기</div>
                      </div>
                   </button>
                </div>
                
                <button 
                  onClick={() => setShowEndModal(false)}
                  className="mt-4 w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  취소
                </button>
              </>
             ) : (
                <div className="text-center">
                   <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <LogOut size={24} className="ml-1" />
                   </div>
                   <h3 className="text-lg font-bold mb-2">회의에서 나가시겠습니까?</h3>
                   <p className="text-sm text-gray-500 mb-6">진행 중인 내용은 본사 담당자가 저장합니다.</p>
                   <div className="space-y-2">
                      <button 
                        onClick={() => navigate(-1)} 
                        className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg shadow-red-500/20"
                      >
                        나가기
                      </button>
                      <button 
                        onClick={() => setShowEndModal(false)} 
                        className="w-full py-3 text-gray-600 font-bold rounded-lg hover:bg-gray-100"
                      >
                        취소
                      </button>
                   </div>
                </div>
             )}
           </div>
        </div>,
        document.body
      )}

      {/* Schedule Modal (For Hold Status) */}
      {showScheduleModal && createPortal(
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}>
            <div className="bg-white rounded-xl p-6 w-[380px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
               {/* Back Button */}
               <button 
                 onClick={() => {
                   setShowScheduleModal(false);
                   setShowEndModal(true);
                 }}
                 className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
               >
                 <ArrowLeft size={18} />
                 <span className="text-sm font-bold">뒤로</span>
               </button>

               <div className="flex flex-col items-center gap-3 mb-6 mt-2">
                 <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                   <Clock size={24} />
                 </div>
                 <div className="text-center">
                   <h3 className="text-xl font-bold text-gray-900">후속 회의 일정</h3>
                   <p className="text-sm text-gray-500">계약을 보류하고 다음 일정을 예약합니다.</p>
                 </div>
               </div>

               <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">날짜 선택</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">시간 선택</label>
                    <input type="time" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-xs text-orange-700 flex gap-2 items-start">
                     <Info size={14} className="mt-0.5 shrink-0" />
                     <p>일정을 잡지 않고 종료하면 현재까지의 <strong>서명 데이터가 유실</strong>될 수 있습니다.</p>
                  </div>
               </div>

               <div className="flex gap-2">
                  <button 
                    onClick={() => {
                       if(window.confirm('일정을 잡지 않고 종료하시겠습니까?\n작성된 서명 데이터는 저장되지 않습니다.')) {
                          alert('계약이 보류되었으며, 회의가 종료됩니다.');
                          navigate('/hq/meeting');
                       }
                    }}
                    className="flex-1 py-3 text-gray-500 font-bold text-sm hover:bg-gray-100 rounded-lg"
                  >
                    나중에 잡기
                  </button>
                  <button 
                    onClick={() => {
                       alert('다음 회의 일정이 예약되었습니다.\n회의를 종료합니다.');
                       navigate('/hq/meeting');
                    }}
                    className="flex-1 py-3 bg-orange-600 text-white font-bold text-sm rounded-lg hover:bg-orange-700 shadow-lg shadow-orange-500/20"
                  >
                    일정 예약 및 종료
                  </button>
               </div>
            </div>
         </div>,
         document.body
      )}
    </div>
  );
};

const VideoFeed = ({ name, isLocal, isMuted, isVideoOff, large = false }: { name: string, isLocal?: boolean, isRemote?: boolean, isMuted?: boolean, isVideoOff?: boolean, large?: boolean }) => (
  <div className={`relative bg-black border border-[#333] overflow-hidden flex items-center justify-center group ${large ? 'h-full w-full rounded-lg' : 'h-[180px] w-full rounded-md shadow-md'}`}>
    {isVideoOff ? (
      <div className="w-24 h-24 rounded-full bg-[#2a2a2a] text-gray-500 flex items-center justify-center text-3xl font-bold">
        {name[0]}
      </div>
    ) : (
      <div className={`absolute inset-0 bg-[#222] flex items-center justify-center`}>
        {/* Mock Video Placeholder */}
        <div className="text-6xl grayscale opacity-20 transform scale-150">
           {isLocal ? '👤' : '👥'}
        </div>
      </div>
    )}
    
    {/* Name Label - Zoom Style */}
    <div className="absolute bottom-1 left-1 bg-black/50 px-2 py-0.5 rounded text-[11px] text-white font-medium flex items-center gap-1.5 backdrop-blur-[2px]">
      {isMuted && <MicOff size={10} className="text-red-500" />}
      <span>{name} {isLocal && '(나)'}</span>
    </div>

    {/* Hover Controls */}
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
       <button className="bg-blue-600 text-white p-1 rounded text-xs">...</button>
    </div>

    {/* Active Speaker Border (Mock) */}
    {!isLocal && !isMuted && (
      <div className="absolute inset-0 border-2 border-green-500 rounded-md pointer-events-none" />
    )}
  </div>
);

const ControlGroup = ({ children }: { children: React.ReactNode }) => (
   <div className="flex items-center gap-2">
      {children}
   </div>
);

const ZoomButton = ({ icon, label, isOn = false, onClick, hasDropdown, isHighlight, badge, isToggle }: any) => (
  <div className="flex flex-col items-center group relative cursor-pointer min-w-[60px]" onClick={onClick}>
    <div className={`
      relative p-2 rounded-xl mb-1 transition-all duration-200
      ${isHighlight && isOn ? 'bg-green-500 text-white' : ''}
      ${!isHighlight ? 'text-gray-300 group-hover:bg-[#2a2a2a] group-hover:text-white' : ''}
      ${isToggle && !isOn ? 'text-red-500' : ''}
    `}>
      {/* Red Slash for Toggles (Mic/Video only) */}
      {isToggle && !isOn && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-red-500 rotate-45 transform scale-x-110" style={{ boxShadow: '0 0 2px rgba(0,0,0,0.5)' }} />
         </div>
      )}
      
      {icon}
      
      {badge && (
         <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            {badge}
         </div>
      )}
    </div>
    
    <div className="flex items-center gap-0.5 text-gray-400 text-[10px] whitespace-nowrap group-hover:text-gray-200">
       <span className="font-medium">{label}</span>
       {hasDropdown && <ChevronUp size={10} />}
    </div>
  </div>
);

export default MeetingRoom;
