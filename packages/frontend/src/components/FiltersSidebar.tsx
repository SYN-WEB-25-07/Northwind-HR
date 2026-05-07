import type { DepartmentFilter } from '../types/employee';

interface Props {
  departments: DepartmentFilter[];
  selectedDepartments: string[];
  onToggleDepartment: (dept: string) => void;
  onReset: () => void;
}

export default function FiltersSidebar({
  departments,
  selectedDepartments,
  onToggleDepartment,
  onReset,
}: Props) {
  return (
    <aside className="filters-sidebar">
      <h3>Abteilung</h3>
      {departments.map((d) => (
        <label key={d.key} className="filter-label">
          <input
            type="checkbox"
            checked={selectedDepartments.includes(d.key)}
            onChange={() => onToggleDepartment(d.key)}
          />
          <span>{d.label}</span>
        </label>
      ))}
      <button className="reset-button" onClick={onReset}>
        Filter zurücksetzen
      </button>
    </aside>
  );
}