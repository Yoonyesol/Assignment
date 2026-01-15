import React from 'react';
import { Search, Filter, MoreHorizontal, Video, Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingList = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>온라인 미팅</h1>
          <p style={{ color: 'var(--text-muted)' }}>가맹계약 미팅 및 정기 교육 일정을 관리하세요.</p>
        </div>
        <button 
          onClick={() => navigate('/hq/contract/request')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Video size={18} />
          <span>새 미팅 만들기</span>
        </button>
      </header>

      {/* Filter & Search bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="회의명, 가맹점, 담당자 검색" style={{ border: 'none', backgroundColor: 'transparent', width: '100%', fontSize: '0.9rem' }} />
        </div>
        <button style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.625rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <Filter size={18} />
          <span>필터</span>
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>회의 및 일정</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>상태</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>참여자</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>ID / 링크</th>
              <th style={{ padding: '1rem 1.5rem', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            <MeetingRow 
              title="강남역점 신규 가맹 계약" 
              date="2024.03.20" 
              time="14:00 - 15:00" 
              status="예정됨" 
              statusColor="var(--primary)"
              participants={['김철수', '홍길동']} 
              meetingId="842-129-304"
              onJoin={() => navigate('/meeting/842-129-304')}
            />
            <MeetingRow 
              title="성수점 Q2 매뉴얼 교육" 
              date="2024.03.21" 
              time="10:00 - 11:30" 
              status="대기중" 
              statusColor="var(--warning)"
              participants={['김철수', '이영희']} 
              meetingId="192-384-552"
            />
             <MeetingRow 
              title="홍대점 계약 갱신 미팅" 
              date="2024.03.18" 
              time="16:00 - 17:00" 
              status="완료" 
              statusColor="var(--success)"
              participants={['김철수', '박철수']} 
              meetingId="556-221-889"
              isCompleted
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MeetingRow = ({ title, date, time, status, statusColor, participants, meetingId, onJoin, isCompleted }: any) => (
  <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s', cursor: 'pointer' }}>
    <td style={{ padding: '1.25rem 1.5rem' }}>
      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.4rem' }}>{title}</div>
      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Calendar size={14} />
          <span>{date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={14} />
          <span>{time}</span>
        </div>
      </div>
    </td>
    <td style={{ padding: '1rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: statusColor, backgroundColor: `${statusColor}1A`, padding: '0.25rem 0.625rem', borderRadius: '100px' }}>
        {status}
      </span>
    </td>
    <td style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {participants.map((p: string, i: number) => (
          <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--background)', border: '2px solid var(--surface)', marginLeft: i > 0 ? '-8px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 600, color: 'var(--primary)' }}>
            {p[0]}
          </div>
        ))}
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{participants.length}명</span>
      </div>
    </td>
    <td style={{ padding: '1rem' }}>
      <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '0.25rem' }}>{meetingId}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'underline' }}>링크 복사</div>
    </td>
    <td style={{ padding: '1rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        {!isCompleted && onJoin && (
          <button 
            onClick={(e) => { e.stopPropagation(); onJoin(); }}
            style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.8rem', fontWeight: 600 }}
          >
            참가
          </button>
        )}
        <button style={{ backgroundColor: 'transparent', color: 'var(--text-muted)' }}>
          <MoreHorizontal size={20} />
        </button>
      </div>
    </td>
  </tr>
);

export default MeetingList;
