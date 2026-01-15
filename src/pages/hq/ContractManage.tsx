import React from 'react';
import { Search, Filter, MoreHorizontal, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const ContractManage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <header>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>계약 관리</h1>
        <p style={{ color: 'var(--text-muted)' }}>체결된 계약 및 진행 중인 계약 문서를 관리합니다.</p>
      </header>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="문서명, 가맹점, 점주명 검색" style={{ border: 'none', backgroundColor: 'transparent', width: '100%', fontSize: '0.9rem' }} />
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
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>문서명</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>가맹점</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>상태</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>최근 활동</th>
              <th style={{ padding: '1rem 1.5rem', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            <ContractRow 
              title="강남역점 가맹 계약서" 
              store="강남역점" 
              status="체결 완료" 
              statusColor="var(--success)"
              date="2024.03.15" 
              icon={<CheckCircle2 size={16} color="var(--success)" />}
            />
            <ContractRow 
              title="성수점 임대차 계약 확인서" 
              store="성수점" 
              status="서명 대기" 
              statusColor="var(--warning)"
              date="2024.03.18" 
              icon={<Clock size={16} color="var(--warning)" />}
            />
            <ContractRow 
              title="홍대점 정보공개서(갱신)" 
              store="홍대점" 
              status="검토 중" 
              statusColor="var(--primary)"
              date="2024.03.12" 
              icon={<FileText size={16} color="var(--primary)" />}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ContractRow = ({ title, store, status, statusColor, date, icon }: any) => (
  <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s', cursor: 'pointer' }}>
    <td style={{ padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          <FileText size={20} />
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{title}</div>
      </div>
    </td>
    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{store}</td>
    <td style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon}
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: statusColor }}>{status}</span>
      </div>
    </td>
    <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{date}</td>
    <td style={{ padding: '1rem 1.5rem' }}>
      <button style={{ backgroundColor: 'transparent', color: 'var(--text-muted)' }}>
        <MoreHorizontal size={20} />
      </button>
    </td>
  </tr>
);

export default ContractManage;
