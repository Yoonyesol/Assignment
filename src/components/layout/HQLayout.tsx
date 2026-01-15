import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  PlusCircle, 
  List,
  LogOut,
  FolderOpen,
  Info,
  Megaphone
} from 'lucide-react';

interface HQLayoutProps {
  isFranchisee?: boolean;
}

const HQLayout: React.FC<HQLayoutProps> = ({ isFranchisee = false }) => {
  const [isContractOpen, setIsContractOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: 'var(--sidebar-width)', 
        backgroundColor: 'var(--surface)', 
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 10
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 800 }}>Doldari</h1>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0.75rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <SidebarLink to={isFranchisee ? "/franchisee/dashboard" : "/hq/dashboard"} icon={<LayoutDashboard size={20} />} label="대시보드" />
            
            {/* HQ Only: Contract Menu */}
            {!isFranchisee && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  onClick={() => setIsContractOpen(!isContractOpen)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.75rem 1rem', 
                    borderRadius: 'var(--radius)', 
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} />
                    <span>계약</span>
                  </div>
                  <ChevronDown size={16} style={{ transform: isContractOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
                </div>
                {isContractOpen && (
                  <div style={{ paddingLeft: '2.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <SidebarLink to="/hq/contract/request" label="계약 요청" />
                    <SidebarLink to="/hq/contract/manage" label="계약 관리" />
                  </div>
                )}
              </div>
            )}

            {/* Franchisee Only: Contract Management */}
            {isFranchisee && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <SidebarLink to="/franchisee/dashboard" icon={<FileText size={20} />} label="계약 관리" />
                <SidebarLink to="/franchisee/dashboard" icon={<Info size={20} />} label="정보공개서 확인" />
              </div>
            )}

            <SidebarLink 
              to={isFranchisee ? "/franchisee/dashboard" : "/hq/meeting"} 
              icon={<Video size={20} />} 
              label="온라인 미팅" 
            />

            {isFranchisee && (
              <SidebarLink to="/franchisee/dashboard" icon={<Megaphone size={20} />} label="공지사항" />
            )}
          </div>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              width: '100%', 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius)',
              color: 'var(--danger)',
              backgroundColor: 'transparent',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ 
          height: 'var(--header-height)', 
          backgroundColor: 'var(--surface)', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 2rem',
          gap: '1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 9
        }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--background)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', minWidth: '300px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="무엇이든 검색해보세요" 
              style={{ border: 'none', backgroundColor: 'transparent', marginLeft: '0.5rem', width: '100%', fontSize: '0.9rem' }} 
            />
          </div>
          <button style={{ position: 'relative', color: 'var(--text-muted)', backgroundColor: 'transparent' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--surface)' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{isFranchisee ? '홍길동 점주' : '김철수 팀장'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isFranchisee ? '강남역점' : '가맹본부'}</div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem', 
      padding: '0.75rem 1rem', 
      borderRadius: 'var(--radius)', 
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
      fontWeight: isActive ? 600 : 400,
      transition: 'all 0.2s',
      fontSize: '0.95rem'
    })}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default HQLayout;
