import { useEffect, useMemo, useState } from 'react';
import { loadEmployeesPage } from '../api/employees';
import EmployeeTable from '../components/EmployeeTable';
import FiltersSidebar from '../components/FiltersSidebar';
import { directoryEmployees } from '../data/fallbackEmployees';
import type { EmployeeDirectoryEntry } from '../types/employee';

const useBackendData = import.meta.env.VITE_USE_BACKEND_DATA !== 'false';
const rowsPerPage = 4;
const defaultSelectedDepartments: string[] = [];

interface DeptFilter {
  key: string;
  label: string;
}

export default function EmployeeDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(defaultSelectedDepartments);
  const [rows, setRows] = useState<EmployeeDirectoryEntry[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [serverPages, setServerPages] = useState(1);
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(!useBackendData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(useBackendData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ---- Daten laden ----
  useEffect(() => {
    if (!useBackendData) return;

    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      try {
        const payload = await loadEmployeesPage({ page, limit: rowsPerPage, signal: controller.signal });

        if (payload.total === 0 || payload.rows.length === 0) {
          setRows(directoryEmployees as any);
          setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.ceil(directoryEmployees.length / rowsPerPage));
          setIsUsingFallbackData(true);
          setErrorMessage('Keine Daten aus Postgres erhalten. Fallback-Daten aktiv.');
          return;
        }

        // Daten normalisieren: department und fullName immer vorhanden
        const normalizedRows = payload.rows.map((emp: any) => ({
          ...emp,
          fullName: emp.fullName || `${emp.first_name || ''} ${emp.last_name || ''}`.trim(),
          department: emp.department || emp.dept_name || '',
        })) as EmployeeDirectoryEntry[];

        setRows(normalizedRows);
        setTotalEmployees(payload.total);
        setServerPages(payload.pages);
        setIsUsingFallbackData(false);
        setErrorMessage(null);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setRows(directoryEmployees as any);
          setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.ceil(directoryEmployees.length / rowsPerPage));
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

  // ---- Abteilungen aus den geladenen Daten extrahieren ----
  const departments: DeptFilter[] = useMemo(() => {
    const deptSet = new Set<string>();
    rows.forEach((r) => {
      const d = r.department || r.dept_name || '';
      if (d) deptSet.add(d);
    });
    return Array.from(deptSet).sort().map((d) => ({ key: d, label: d }));
  }, [rows]);

  // ---- Gefilterte Liste ----
  const visibleEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rows.filter(emp => {
      const dept = emp.department || emp.dept_name || '';
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(dept)) {
        return false;
      }
      if (!q) return true;
      const fn = emp.fullName || '';
      return fn.toLowerCase().includes(q) || (emp.role || '').toLowerCase().includes(q);
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
          departments={departments}
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