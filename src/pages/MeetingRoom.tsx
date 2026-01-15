import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users, 
  Settings, PhoneOff, Maximize, FileText, Shield, Download, CheckCircle, Info, ChevronRight, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showContract, setShowContract] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#0F172A', 
      display: 'flex', 
      flexDirection: 'column',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Top Bar */}
      <header style={{ 
        height: '60px', 
        padding: '0 1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, color: '#EF4444' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            REC {formatTime(time)}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94A3B8' }}>
            강남역점 신규 가맹 계약 미팅
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Shield size={20} color="var(--success)" />
          <Maximize size={20} style={{ cursor: 'pointer' }} />
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '1rem' }}>
        {/* Videos Section */}
        <div style={{ 
          flex: 1, 
          display: 'grid', 
          gridTemplateRows: showContract ? 'repeat(2, 1fr)' : '1fr',
          gridTemplateColumns: showContract ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem',
          transition: 'all 0.3s ease'
        }}>
          {/* Remote Feed */}
          <VideoFeed name="홍길동 (점주)" isRemote />
          {/* Local Feed */}
          <VideoFeed name="김철수 (본사)" isLocal isMuted={isMuted} isVideoOff={isVideoOff} />
        </div>

        {/* Contract Panel */}
        {showContract && (
          <div style={{ 
            width: '45%', 
            marginLeft: '1rem', 
            backgroundColor: '#1E293B', 
            borderRadius: 'var(--radius-xl)', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>가맹계약서.pdf</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}><Download size={16} /></button>
                <button onClick={() => setShowContract(false)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}><X size={16} /></button>
              </div>
            </header>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', backgroundColor: '#334155', position: 'relative' }}>
               {/* Identity Verification Overlay (Concept) */}
               <div style={{ 
                 position: 'absolute', 
                 top: '1rem', 
                 left: '1rem', 
                 right: '1rem', 
                 backgroundColor: 'rgba(16, 185, 129, 0.9)', 
                 padding: '0.75rem 1rem', 
                 borderRadius: 'var(--radius)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.75rem',
                 backdropFilter: 'blur(4px)',
                 zIndex: 5
               }}>
                 <CheckCircle size={20} />
                 <div style={{ fontSize: '0.8rem' }}>
                   <strong>신원 확인 완료:</strong> 홍길동 점주님의 본인 인증이 완료되었습니다.
                 </div>
               </div>

              {/* PDF Content Placeholder */}
              <div style={{ 
                backgroundColor: 'white', 
                width: '100%', 
                minHeight: '800px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                padding: '3rem',
                color: '#334155'
              }}>
                <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>가맹 계약서</h1>
                <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>제 1조 (목적)...</p>
                <div style={{ border: '1px dashed var(--primary)', padding: '1rem', backgroundColor: 'rgba(11, 92, 255, 0.05)', color: 'var(--primary)', fontSize: '0.8rem', borderRadius: 'var(--radius)', marginTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    <Info size={14} />
                    AI 핵심 설명 조항
                  </div>
                  "본 조항은 영업지역에 대한 보호 범위를 규정합니다. 강남구 대치동 일대 반경 500m 이내에는 동일 업종 입점이 제한됩니다."
                </div>
                
                {/* Signature Interaction */}
                <div style={{ marginTop: '5rem', border: '2px solid var(--primary)', borderStyle: 'dashed', height: '100px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>서명하기</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>홍길동 점주님 서명 위치</div>
                </div>
              </div>
            </div>

            <footer style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: 'var(--radius)', fontWeight: 600 }}>
                다음 페이지로
              </button>
            </footer>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <footer style={{ 
        height: '80px', 
        backgroundColor: '#0F172A', 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <ControlButton icon={isMuted ? <MicOff color="#EF4444" /> : <Mic />} onClick={() => setIsMuted(!isMuted)} label="음소거" />
          <ControlButton icon={isVideoOff ? <VideoOff color="#EF4444" /> : <Video />} onClick={() => setIsVideoOff(!isVideoOff)} label="비디오" />
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />
          <ControlButton icon={<FileText color={showContract ? 'var(--primary)' : 'white'} />} onClick={() => setShowContract(!showContract)} label="계약서" />
          <ControlButton icon={<Monitor />} label="화면 공유" />
          <ControlButton icon={<Users />} label="참가자" />
          <ControlButton icon={<MessageSquare />} label="채팅" />
          <ControlButton icon={<Settings />} label="설정" />
        </div>
        
        <button 
          onClick={() => navigate('/hq/dashboard')}
          style={{ 
            position: 'absolute', 
            right: '2rem', 
            backgroundColor: '#EF4444', 
            color: 'white', 
            padding: '0.625rem 1.25rem', 
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <PhoneOff size={18} />
          나가기
        </button>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const VideoFeed = ({ name, isLocal, isRemote, isMuted, isVideoOff }: any) => (
  <div style={{ 
    backgroundColor: '#1E293B', 
    borderRadius: 'var(--radius-xl)', 
    position: 'relative', 
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    {isVideoOff ? (
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
        {name[0]}
      </div>
    ) : (
      <div style={{ position: 'absolute', inset: 0, backgroundColor: isLocal ? '#334155' : '#1e293b' }}>
        {/* Mock Video content */}
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', opacity: 0.2 }}>
           {isLocal ? '👤' : '👥'}
        </div>
      </div>
    )}
    
    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {isMuted && <MicOff size={14} color="#EF4444" />}
      {name} {isLocal && '(나)'}
    </div>
  </div>
);

const ControlButton = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '0.4rem', 
      backgroundColor: 'transparent',
      color: 'white',
      minWidth: '64px',
      padding: '0.5rem'
    }}
  >
    <div style={{ 
      width: '44px', 
      height: '44px', 
      borderRadius: '12px', 
      backgroundColor: 'rgba(255,255,255,0.05)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      transition: 'all 0.2s'
    }} className="ctrl-btn">
      {icon}
    </div>
    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{label}</span>
  </button>
);

export default MeetingRoom;
