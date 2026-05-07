interface DepartmentFilter {
  key: string;
  label: string;
}

interface Props {
  departments: DepartmentFilter[];
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
  onReset: () => void;
}

export default function FiltersSidebar({
  departments,
  selectedDepartment,
  onSelectDepartment,
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
                    type="radio"
                    name="department"
                    checked={selectedDepartment === d.key}
                    onChange={() => onSelectDepartment(d.key)}
                  />
                  {d.label}
                </div>
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