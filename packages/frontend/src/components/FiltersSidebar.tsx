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
    <div className="filters-column">
      <div className="filters-card">
        <h3 className="filters-title">Abteilung</h3>
        <div className="filter-group">
          <div className="filter-items">
            {departments.map((d) => (
              <label key={d.key} className="filter-checkbox-row">
                <div className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(d.key)}
                    onChange={() => onToggleDepartment(d.key)}
                  />
                  {d.label}
                </div>
                {/* Hier könnte man die Anzahl pro Abteilung anzeigen, wenn vorhanden */}
              </label>
            ))}
          </div>
        </div>
        <button className="reset-button" onClick={onReset}>
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
}