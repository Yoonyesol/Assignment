import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HQLayout from './components/layout/HQLayout';
import HQDashboard from './pages/hq/Dashboard';
import ContractRequest from './pages/hq/ContractRequest';
import ContractManage from './pages/hq/ContractManage';
import MeetingList from './pages/hq/MeetingList';
import DisclosureManage from './pages/hq/DisclosureManage';
import FranchiseeDashboard from './pages/franchisee/Dashboard';
import FranchiseeMeetingList from './pages/franchisee/MeetingList';
import FranchiseeContractManage from './pages/franchisee/ContractManage';
import DisclosureList from './pages/franchisee/DisclosureList';
import MeetingRoom from './pages/MeetingRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* HQ Routes */}
      <Route path="/hq" element={<HQLayout />}>
        <Route index element={<Navigate to="/hq/dashboard" replace />} />
        <Route path="dashboard" element={<HQDashboard />} />
        <Route path="contract/request" element={<ContractRequest />} />
        <Route path="contract/manage" element={<ContractManage />} />
        <Route path="meeting" element={<MeetingList />} />
        {/* URL 매챙이 안 되면 사이드바에 추가해야 함. 현재 사이드바에는 없음. 일단 라우트만 등록 */}
        <Route path="disclosure/manage" element={<DisclosureManage />} />
      </Route>

      {/* Franchisee Routes */}
      <Route path="/franchisee" element={<HQLayout isFranchisee />}>
        <Route index element={<Navigate to="/franchisee/dashboard" replace />} />
        <Route path="dashboard" element={<FranchiseeDashboard />} />
        <Route path="meeting" element={<FranchiseeMeetingList />} />
        <Route path="contract" element={<FranchiseeContractManage />} />
        <Route path="disclosure" element={<DisclosureList />} />
      </Route>

      {/* Meeting Room - Full Screen */}
      <Route path="/meeting/:id" element={<MeetingRoom />} />
    </Routes>
  );
}

export default App;
