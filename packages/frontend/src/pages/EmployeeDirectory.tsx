import { useEffect, useMemo, useState } from 'react';
import { loadEmployeesPage } from '../api/employees';
import EmployeeTable from '../components/EmployeeTable';
import FiltersSidebar from '../components/FiltersSidebar';
import { directoryEmployees } from '../data/fallbackEmployees';
import type { EmployeeDirectoryEntry } from '../types/employee';

const useBackendData = import.meta.env.VITE_USE_BACKEND_DATA !== 'false';
const rowsPerPage = 4;
const defaultSelectedDepartments: string[] = [];
const departmentList = [
  { key: 'Development', label: 'Development' }, { key: 'Production', label: 'Production' },
  { key: 'Sales', label: 'Sales' }, { key: 'Human Resources', label: 'Human Resources' },
  { key: 'Research', label: 'Research' }, { key: 'Quality Management', label: 'Quality Management' },
  { key: 'Marketing', label: 'Marketing' }, { key: 'Finance', label: 'Finance' },
  { key: 'Customer Service', label: 'Customer Service' },
];

export default function EmployeeDirectoryPage() {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(defaultSelectedDepartments);
  const [rows, setRows] = useState<EmployeeDirectoryEntry[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [serverPages, setServerPages] = useState(1);
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
        const deptString = selectedDepartments.length > 0 ? selectedDepartments.join(',') : undefined;
        const payload = await loadEmployeesPage({ page, limit: rowsPerPage, signal: controller.signal, dept: deptString });
        if (payload.total === 0 || payload.data.length === 0) {
          setRows(directoryEmployees as any); setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.ceil(directoryEmployees.length / rowsPerPage));
          setIsUsingFallbackData(true); setErrorMessage('Keine Daten aus Postgres erhalten. Fallback aktiv.');
          return;
        }
        const normalizedRows = payload.data.map((emp: any) => ({ ...emp, fullName: emp.fullName || `${emp.first_name || ''} ${emp.last_name || ''}`.trim(), department: emp.department || '' })) as EmployeeDirectoryEntry[];
        setRows(normalizedRows);
        setTotalEmployees(payload.pagination.total); setServerPages(payload.pagination.pages);
        setIsUsingFallbackData(false); setErrorMessage(null);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setRows(directoryEmployees as any); setTotalEmployees(directoryEmployees.length);
          setServerPages(Math.ceil(directoryEmployees.length / rowsPerPage));
          setIsUsingFallbackData(true); setErrorMessage('Postgres nicht erreichbar. Fallback aktiv.');
        }
      } finally { setIsLoading(false); }
    };
    void run();
    return () => controller.abort();
  }, [page, selectedDepartments]);

  const visibleEmployees = rows;
  const totalPages = useMemo(() => {
    if (useBackendData && !isUsingFallbackData) return Math.max(1, serverPages);
    return Math.max(1, Math.ceil(visibleEmployees.length / rowsPerPage));
  }, [visibleEmployees.length, serverPages, isUsingFallbackData]);
  useEffect(() => { setPage(1); }, [selectedDepartments]);

  const displayTotal = useBackendData && !isUsingFallbackData ? totalEmployees : visibleEmployees.length;
  const from = visibleEmployees.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
  const to = visibleEmployees.length > 0 ? Math.min(page * rowsPerPage, displayTotal) : 0;

  return (
    <>
      <section className="toolbar-row">
        <div><h2>Mitarbeiterverzeichnis</h2><div className="breadcrumbs"><span>Übersicht</span><span className="material-symbols-outlined">chevron_right</span><span className="is-current">Alle Mitarbeiter</span></div></div>
        <button className="primary-action"><span className="material-symbols-outlined">person_add</span><span>Neuen Mitarbeiter hinzufügen</span></button>
      </section>
      <section className="content-grid">
        <FiltersSidebar departments={departmentList} selectedDepartments={selectedDepartments} onToggleDepartment={(dept) => setSelectedDepartments(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept])} onReset={() => setSelectedDepartments(defaultSelectedDepartments)} />
        <EmployeeTable employees={visibleEmployees} totalEmployees={displayTotal} page={page} totalPages={totalPages} from={from} to={to} onPageChange={setPage} isLoading={isLoading} errorMessage={errorMessage} />
      </section>
    </>
  );
}
