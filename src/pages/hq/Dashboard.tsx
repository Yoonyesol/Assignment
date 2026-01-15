import React from 'react';
import { Users, FileCheck, Video, AlertCircle, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>안녕하세요, 김철수 팀장님 👋</h1>
        <p style={{ color: 'var(--text-muted)' }}>오늘의 가맹 관리 현황입니다.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard icon={<Users color="var(--primary)" />} label="활성 가맹점" value="124" trend="+3" />
        <StatCard icon={<FileCheck color="#10B981" />} label="진행 중인 계약" value="8" trend="+2" />
        <StatCard icon={<Video color="#F59E0B" />} label="오늘 예정 미팅" value="4" />
        <StatCard icon={<AlertCircle color="#EF4444" />} label="리스크 감지" value="1" trend="-1" trendDown />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Franchisee Info Table */}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>최근 가맹점 업데이트</h3>
            <button style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, backgroundColor: 'transparent' }}>전체보기</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>지점명</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>점주명</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>계약 상태</th>
                <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>최근 방문</th>
              </tr>
            </thead>
            <tbody>
              <TableRow name="강남역점" owner="홍길동" status="정상" lastVisit="2024.03.10" />
              <TableRow name="성수점" owner="이영희" status="갱신예정" lastVisit="2024.03.12" statusColor="#F59E0B" />
              <TableRow name="홍대점" owner="박철수" status="정상" lastVisit="2024.03.08" />
              <TableRow name="여의도점" owner="최민지" status="주의" lastVisit="2024.03.15" statusColor="#EF4444" />
            </tbody>
          </table>
        </div>

        {/* Meeting Info */}
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>오늘의 미팅 일정</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <MeetingItem time="14:00" title="신규 가맹 계약 (판교점)" type="계약" />
            <MeetingItem time="15:30" title="Q2 프로모션 교육" type="교육" />
            <MeetingItem time="17:00" title="정기 점검 화상 미팅 (성수점)" type="점검" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, trendDown = false }: any) => (
  <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      {trend && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trendDown ? 'var(--danger)' : 'var(--success)', backgroundColor: trendDown ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', padding: '0.25rem 0.5rem', borderRadius: '100px', alignSelf: 'flex-start' }}>
          {trend}
        </span>
      )}
    </div>
    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{value}</div>
    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{label}</div>
  </div>
);

const TableRow = ({ name, owner, status, lastVisit, statusColor = 'var(--success)' }: any) => (
  <tr style={{ borderBottom: '1px solid var(--border)' }}>
    <td style={{ padding: '1rem 0', fontSize: '0.9rem', fontWeight: 500 }}>{name}</td>
    <td style={{ padding: '1rem 0', fontSize: '0.9rem' }}>{owner}</td>
    <td style={{ padding: '1rem 0' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: statusColor, backgroundColor: `${statusColor}1A`, padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
        {status}
      </span>
    </td>
    <td style={{ padding: '1rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{lastVisit}</td>
  </tr>
);

const MeetingItem = ({ time, title, type }: any) => (
  <div style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--background)' }}>
    <div style={{ textAlign: 'center', minWidth: '50px' }}>
      <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{time}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PM</div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{type}</div>
    </div>
    <button style={{ backgroundColor: 'white', color: 'var(--primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ArrowUpRight size={16} />
    </button>
  </div>
);

export default Dashboard;
