import { useEffect, useMemo, useState } from 'react';
import { loadEmployeesPage } from '../api/employees';
import type { Employee } from '../api/employees';
import EmployeeTable from '../components/EmployeeTable';
import FiltersSidebar from '../components/FiltersSidebar';
import { departmentFilters, directoryEmployees } from '../data/fallbackEmployees';
import type { EmployeeDirectoryEntry } from '../types/employee';

const useBackendData = import.meta.env.VITE_USE_BACKEND_DATA !== 'false';
const rowsPerPage = 4;
const defaultSelectedDepartments: string[] = [];

const mapEmployeeToRow = (emp: Employee): EmployeeDirectoryEntry => ({
  fullName: emp.fullName,
  role: emp.role,
  department: emp.department,
});

export default function EmployeeDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(defaultSelectedDepartments);
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
    if (!useBackendData) return;
    const controller = new AbortController();
    const run = async () => {
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
        setRows(payload.rows.map(mapEmployeeToRow));
        setTotalEmployees(payload.total);
        setServerPages(payload.pages);
        setPage(payload.page);
        setIsUsingFallbackData(false);
        setErrorMessage(null);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
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
    const q = searchQuery.trim().toLowerCase();
    return rows.filter(emp => {
      const matchesDept = selectedDepartments.length === 0 || selectedDepartments.includes(emp.department ?? '');
      if (!matchesDept) return false;
      if (!q) return true;
      return emp.fullName?.toLowerCase().includes(q) || emp.role?.toLowerCase().includes(q) || emp.department?.toLowerCase().includes(q);
    });
  }, [rows, searchQuery, selectedDepartments]);

  const totalPages = useMemo(() => {
    if (useBackendData && !isUsingFallbackData) return Math.max(1, serverPages);
    return Math.max(1, Math.ceil(visibleEmployees.length / rowsPerPage));
  }, [visibleEmployees.length, serverPages, isUsingFallbackData]);

  useEffect(() => { setPage(1); }, [searchQuery, selectedDepartments]);

  const pagedEmployees = useMemo(() => {
    if (useBackendData && !isUsingFallbackData) return visibleEmployees;
    const start = (page - 1) * rowsPerPage;
    return visibleEmployees.slice(start, start + rowsPerPage);
  }, [visibleEmployees, page, isUsingFallbackData]);

  const displayTotal = useBackendData && !isUsingFallbackData ? totalEmployees : visibleEmployees.length;
  const from = pagedEmployees.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
  const to = pagedEmployees.length > 0 ? Math.min((page - 1) * rowsPerPage + pagedEmployees.length, displayTotal) : 0;

  return (
    <>
      <section className="toolbar-row">
        <div>
          <h2>Mitarbeiterverzeichnis</h2>
          <div className="breadcrumbs">
            <span>Übersicht</span>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className="is-current">Alle Mitarbeiter</span>
          </div>
        </div>
        <button className="primary-action">
          <span className="material-symbols-outlined">person_add</span>
          <span>Neuen Mitarbeiter hinzufügen</span>
        </button>
      </section>
      <section className="content-grid">
        <FiltersSidebar
          departments={departmentFilters}
          selectedDepartments={selectedDepartments}
          onToggleDepartment={(dept) =>
            setSelectedDepartments(prev =>
              prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
            )
          }
          onReset={() => setSelectedDepartments(defaultSelectedDepartments)}
        />
        <EmployeeTable
          employees={pagedEmployees}
          totalEmployees={displayTotal}
          page={page}
          totalPages={totalPages}
          from={from}
          to={to}
          onPageChange={setPage}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </section>
    </>
  );
}