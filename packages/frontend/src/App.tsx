import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import EmployeeDirectoryPage from './pages/EmployeeDirectory';

function App() {
  // Dieser State steuert das mobile Menü
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <TopBar
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)} searchQuery={''} onSearchChange={function (value: string): void {
            throw new Error('Function not implemented.');
          } }        />
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