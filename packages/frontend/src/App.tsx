import { useEffect, useMemo, useState } from 'react';
import { loadEmployeesPage } from './api/employees';
import EmployeeTable from './components/EmployeeTable';
import FiltersSidebar from './components/FiltersSidebar';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import {
  departmentFilters,
  directoryEmployees,
  locationFilters
} from './data/fallbackEmployees';
import type { EmployeeDirectoryEntry } from './types/employee';

const useBackendData = import.meta.env.VITE_USE_BACKEND_DATA !== 'false';
const rowsPerPage = 4;
const defaultSelectedDepartments: string[] = [];

const App = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(defaultSelectedDepartments);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rows, setRows] = useState<EmployeeDirectoryEntry[]>(useBackendData ? [] : directoryEmployees);
  const [totalEmployees, setTotalEmployees] = useState(useBackendData ? 0 : directoryEmployees.length);
  const [serverPages, setServerPages] = useState(
    useBackendData ? 1 : Math.max(1, Math.ceil(directoryEmployees.length / rowsPerPage))
  );
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(!useBackendData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(useBackendData);
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
        const payload = await loadEmployeesPage({ page, limit: rowsPerPage, signal: controller.signal });

        if (payload.total === 0 || payload.rows.length === 0) {
          setRows(directoryEmployees);
          setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.max(1, Math.ceil(directoryEmployees.length / rowsPerPage)));
          setPage(1);
          setIsUsingFallbackData(true);
          setErrorMessage('Keine Daten aus Postgres erhalten. Fallback-Daten aktiv.');
          return;
        }

        setRows((previousRows) =>
          payload.rows.map((employee, index) => ({
            ...employee,
            avatar: previousRows[index]?.avatar ?? ''
          }))
        );
        setTotalEmployees(payload.total);
        setServerPages(payload.pages);
        setPage(payload.page);
        setIsUsingFallbackData(false);
        setErrorMessage(null);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setRows(directoryEmployees);
          setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.max(1, Math.ceil(directoryEmployees.length / rowsPerPage)));
          setPage(1);
          setIsUsingFallbackData(true);
          setErrorMessage('Postgres nicht erreichbar. Fallback-Daten aktiv.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void run();
    return () => controller.abort();
  }, [page]);

  const visibleEmployees = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return rows.filter((employee) => {
      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(employee.department);
      const matchesLocation = !selectedLocation || selectedLocation === employee.location;
      if (!matchesDepartment || !matchesLocation) {
        return false;
      }

      if (!query) {
        return true;
      }

      const inName = employee.fullName.toLowerCase().includes(query);
      const inRole = employee.role.toLowerCase().includes(query);
      const inDepartment = employee.department.toLowerCase().includes(query);
      return inName || inRole || inDepartment;
    });
  }, [rows, searchQuery, selectedDepartments, selectedLocation]);

  const filterIsActive =
    selectedDepartments.length > 0 || Boolean(selectedLocation) || searchQuery.trim().length > 0;

  const totalPages = useMemo(() => {
    if (useBackendData && !isUsingFallbackData && !filterIsActive) {
      return Math.max(1, serverPages);
    }

    return Math.max(1, Math.ceil(visibleEmployees.length / rowsPerPage));
  }, [visibleEmployees.length, serverPages, filterIsActive, isUsingFallbackData]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedDepartments, selectedLocation]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedEmployees = useMemo(() => {
    if (useBackendData && !isUsingFallbackData && !filterIsActive) {
      return visibleEmployees;
    }

    const startIndex = (page - 1) * rowsPerPage;
    return visibleEmployees.slice(startIndex, startIndex + rowsPerPage);
  }, [visibleEmployees, page, filterIsActive, isUsingFallbackData]);

  const displayTotalEmployees =
    useBackendData && !isUsingFallbackData && !filterIsActive ? totalEmployees : visibleEmployees.length;
  const displayFrom = pagedEmployees.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
  const displayTo =
    pagedEmployees.length > 0
      ? Math.min((page - 1) * rowsPerPage + pagedEmployees.length, displayTotalEmployees)
      : 0;

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
              employees={pagedEmployees}
              totalEmployees={displayTotalEmployees}
              page={page}
              totalPages={totalPages}
              from={displayFrom}
              to={displayTo}
              onPageChange={setPage}
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
