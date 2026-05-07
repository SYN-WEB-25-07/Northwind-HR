import { useEffect, useMemo, useState } from 'react';
import { loadEmployeesPage } from './api/employees';
import EmployeeTable from './components/EmployeeTable';
import FiltersSidebar from './components/FiltersSidebar';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import {
  departmentFilters,
  directoryEmployees,
  locationFilters,
  totalEmployeesSnapshot
} from './data/fallbackEmployees';
import type { EmployeeDirectoryEntry } from './types/employee';

const useBackendData = import.meta.env.VITE_USE_BACKEND_DATA === 'true';
const defaultSelectedDepartments = departmentFilters
  .filter((department) => department.defaultSelected)
  .map((department) => department.name);

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(defaultSelectedDepartments);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rows, setRows] = useState<EmployeeDirectoryEntry[]>(directoryEmployees);
  const [totalEmployees, setTotalEmployees] = useState(totalEmployeesSnapshot);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const closeOnDesktop = (): void => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
      return () => {
        document.body.style.overflow = '';
      };
    }

    return undefined;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!useBackendData) {
      return;
    }

    const controller = new AbortController();

    const run = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const payload = await loadEmployeesPage({ page: 1, limit: 20, signal: controller.signal });
        setRows((previousRows) =>
          payload.rows.map((employee, index) => ({
            ...employee,
            avatar: previousRows[index]?.avatar ?? ''
          }))
        );
        setTotalEmployees(payload.total);
        setPage(payload.page);
        setErrorMessage(null);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setRows(directoryEmployees);
          setTotalEmployees(totalEmployeesSnapshot);
          setPage(1);
          setErrorMessage('Backend konnte nicht geladen werden. Fallback-Daten aktiv.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void run();
    return () => controller.abort();
  }, []);

  const visibleEmployees = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((employee) => {
      const inName = employee.fullName.toLowerCase().includes(query);
      const inRole = employee.role.toLowerCase().includes(query);
      const inDepartment = employee.department.toLowerCase().includes(query);
      return inName || inRole || inDepartment;
    });
  }, [rows, searchQuery]);

  const displayTotalEmployees = searchQuery ? visibleEmployees.length : totalEmployees;

  const handleToggleDepartment = (department: string): void => {
    setSelectedDepartments((previous) =>
      previous.includes(department)
        ? previous.filter((existing) => existing !== department)
        : [...previous, department]
    );
  };

  const handleResetFilters = (): void => {
    setSelectedDepartments(defaultSelectedDepartments);
    setSelectedLocation('');
  };

  return (
    <div className="app-shell">
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
      />

      <main className="dashboard-main">
        <div className="main-inner">
          <section className="toolbar-row">
            <div>
              <h2>Mitarbeiterverzeichnis</h2>
              <div className="breadcrumbs" aria-label="Breadcrumb">
                <span>Übersicht</span>
                <span className="material-symbols-outlined">chevron_right</span>
                <span className="is-current">Alle Mitarbeiter</span>
              </div>
            </div>

            <button type="button" className="primary-action">
              <span className="material-symbols-outlined">person_add</span>
              <span>Neuen Mitarbeiter hinzufügen</span>
            </button>
          </section>

          <section className="content-grid">
            <FiltersSidebar
              departments={departmentFilters}
              locations={locationFilters}
              selectedDepartments={selectedDepartments}
              selectedLocation={selectedLocation}
              onToggleDepartment={handleToggleDepartment}
              onSelectLocation={setSelectedLocation}
              onReset={handleResetFilters}
            />

            <EmployeeTable
              employees={visibleEmployees}
              totalEmployees={displayTotalEmployees}
              page={page}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
