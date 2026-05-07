import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import EmployeeDirectoryPage from './pages/EmployeeDirectory';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar isMobileOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <TopBar searchQuery={''} onSearchChange={function (value: string): void {
          throw new Error('Function not implemented.');
        } } isMobileMenuOpen={false} onMenuToggle={function (): void {
          throw new Error('Function not implemented.');
        } } />
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeDirectoryPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;