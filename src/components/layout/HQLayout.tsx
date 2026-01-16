import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  FileText, 
  Settings, 
  Video,
  LogOut,
  ChevronDown,
  BookOpen
} from 'lucide-react';

interface HQLayoutProps {
  isFranchisee?: boolean;
}

const HQLayout: React.FC<HQLayoutProps> = ({ isFranchisee = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isContractOpen, setIsContractOpen] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">Doldari</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {/* 대시보드 */}
            <NavLink
              to={isFranchisee ? "/franchisee/dashboard" : "/hq/dashboard"}
              icon={<LayoutGrid className="w-5 h-5" />}
              label="대시보드"
              isActive={location.pathname === (isFranchisee ? "/franchisee/dashboard" : "/hq/dashboard")}
            />

            {/* HQ Only: Contract Menu with Submenu */}
            {!isFranchisee && (
              <div>
                <button
                  onClick={() => setIsContractOpen(!isContractOpen)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium rounded-lg
                           text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>계약</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${isContractOpen ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
                
                {isContractOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    <SubNavLink
                      to="/hq/contract/request"
                      label="계약 요청"
                      isActive={location.pathname === "/hq/contract/request"}
                    />
                    <SubNavLink
                      to="/hq/contract/manage"
                      label="계약 관리"
                      isActive={location.pathname === "/hq/contract/manage"}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Franchisee menus */}
            {isFranchisee && (
              <>
               <NavLink
                  to="/franchisee/contract"
                  icon={<FileText className="w-5 h-5" />}
                  label="계약 관리"
                  isActive={location.pathname === "/franchisee/contract"}
                />
              <NavLink
                  to="/franchisee/disclosure"
                  icon={<BookOpen className="w-5 h-5" />}
                  label="정보공개서 확인"
                  isActive={location.pathname === "/franchisee/disclosure"}
                />
                <NavLink
                  to="/franchisee/meeting"
                  icon={<Video className="w-5 h-5" />}
                  label="온라인 미팅"
                  isActive={location.pathname === "/franchisee/meeting"}
                />
               
              </>
            )}

            {/* HQ Online Meeting */}
            {!isFranchisee && (
              <NavLink
                to="/hq/meeting"
                icon={<Video className="w-5 h-5" />}
                label="온라인 미팅"
                isActive={location.pathname === "/hq/meeting"}
              />
            )}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
                       hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">대시보드</h2>
          </div>
          
          {/* Right Side: User Info & Company Info */}
          <div className="flex items-center gap-4">
            {/* Franchise Code */}
            {!isFranchisee && (
              <div className="hidden md:block">
                <div className="text-xs text-gray-500">가맹점 코드</div>
                <div className="text-sm font-mono font-medium text-gray-700">00ej12euye</div>
              </div>
            )}
            
            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-gray-900">
                  {isFranchisee ? '홍길동 점주' : '김철수 팀장'}
                </div>
                <div className="text-xs text-gray-500">
                  {isFranchisee ? '강남역점' : 'BHC 본사'}
                </div>
              </div>
              
              {/* Logo/Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                BHC
              </div>
            </div>
            

          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`
      flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    {icon}
    {label}
  </Link>
);

interface SubNavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const SubNavLink: React.FC<SubNavLinkProps> = ({ to, label, isActive }) => (
  <Link
    to={to}
    className={`
      block px-3 py-2 text-sm font-medium rounded-lg transition-colors
      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    {label}
  </Link>
);

export default HQLayout;
