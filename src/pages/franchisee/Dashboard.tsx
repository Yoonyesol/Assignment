import React from 'react';
import { 
  FileText, Video, Info, Megaphone, 
  ChevronRight, Calendar, PlayCircle, Download, Clock 
} from 'lucide-react';

const FranchiseeDashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>반갑습니다, 홍길동 점주님 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>오늘의 매장 관리 및 예정된 일정입니다.</p>
      </header>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Upcoming Contracts / Meetings */}
          <Section title="참여 대기 중인 일정">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ScheduleCard 
                type="계약" 
                title="가맹계약 체결 미팅" 
                date="2024.03.20 (수)" 
                time="14:00" 
                urgent 
                link="/meeting/842-129-304"
              />
              <ScheduleCard 
                type="교육" 
                title="Q2 위생 및 서비스 교육" 
                date="2024.03.25 (월)" 
                time="10:00" 
              />
            </div>
          </Section>

          {/* Completed Contracts with Media */}
          <Section title="완료된 계약 및 기록물">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <ArchiveCard 
                title="초기 가맹 상담 기록" 
                date="2024.02.15" 
                hasVideo 
                hasDoc
              />
              <ArchiveCard 
                title="정보공개서 수령 확인" 
                date="2024.02.01" 
                hasDoc
              />
            </div>
          </Section>
        </div>

        {/* Sidebar components for Franchisee */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Info Disclosure */}
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: '0 8px 16px rgba(11, 92, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Info size={24} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>정보공개서 확인</h3>
            </div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>
              최신 정보공개서가 업데이트되었습니다. 
              내용을 확인하고 열람 확인 내역을 남겨주세요.
            </p>
            <button style={{ width: '100%', backgroundColor: 'white', color: 'var(--primary)', padding: '0.75rem', borderRadius: 'var(--radius)', fontWeight: 700, border: 'none' }}>
              지금 확인하기
            </button>
          </div>

          {/* Notices */}
          <Section title="공지사항">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <NoticeItem title="Q2 신메뉴 출시 가이드 배포" date="2024.03.15" />
              <NoticeItem title="봄맞이 인테리어 점검 안내" date="2024.03.10" />
              <NoticeItem title="본사 정기 워크숍 휴무 공지" date="2024.03.05" />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3 style={{ fontSize: '1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {title}
      <ChevronRight size={18} color="var(--text-muted)" />
    </h3>
    {children}
  </div>
);

const ScheduleCard = ({ type, title, date, time, urgent, link }: any) => (
  <div style={{ 
    backgroundColor: 'var(--surface)', 
    padding: '1.25rem', 
    borderRadius: 'var(--radius-xl)', 
    border: urgent ? '2px solid var(--primary)' : '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--shadow-sm)'
  }}>
    <div style={{ display: 'flex', gap: '1.25rem' }}>
      <div style={{ 
        width: '56px', 
        height: '56px', 
        backgroundColor: urgent ? 'var(--primary-light)' : 'var(--background)', 
        borderRadius: 'var(--radius)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: urgent ? 'var(--primary)' : 'var(--text-muted)'
      }}>
        <Calendar size={24} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: urgent ? 'var(--primary)' : 'var(--text-muted)', textTransform: 'uppercase' }}>{type}</span>
          {urgent && <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />}
        </div>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{date}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
    {link ? (
       <a href={link} style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.625rem 1.25rem', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '0.875rem' }}>
         참여하기
       </a>
    ) : (
      <button style={{ backgroundColor: 'var(--background)', color: 'var(--text-muted)', padding: '0.625rem 1.25rem', borderRadius: 'var(--radius)', fontWeight: 600, fontSize: '0.875rem', cursor: 'not-allowed' }}>
        입장 대기
      </button>
    )}
  </div>
);

const ArchiveCard = ({ title, date, hasVideo, hasDoc }: any) => (
  <div style={{ backgroundColor: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>{title}</h4>
    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{date}</div>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {hasVideo && <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(11, 92, 255, 0.05)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}><PlayCircle size={14} /> 영상</button>}
      {hasDoc && <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 600 }}><FileText size={14} /> 계약서</button>}
      <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background)', color: 'var(--text-muted)' }}><Download size={14} /></button>
    </div>
  </div>
);

const NoticeItem = ({ title, date }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{date}</div>
  </div>
);

export default FranchiseeDashboard;
