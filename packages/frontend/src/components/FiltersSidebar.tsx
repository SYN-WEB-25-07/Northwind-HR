import { memo } from 'react';
import type { DepartmentFilter, EmployeeLocation } from '../types/employee';

interface FiltersSidebarProps {
  departments: DepartmentFilter[];
  locations: readonly EmployeeLocation[];
  selectedDepartments: string[];
  selectedLocation: string;
  onToggleDepartment: (department: string) => void;
  onSelectLocation: (location: string) => void;
  onReset: () => void;
}

const FiltersSidebar = ({
  departments,
  locations,
  selectedDepartments,
  selectedLocation,
  onToggleDepartment,
  onSelectLocation,
  onReset
}: FiltersSidebarProps): JSX.Element => {
  return (
    <aside className="filters-column">
      <section className="filters-card" aria-label="Filter">
        <h3 className="filters-title">Filter</h3>

        <div className="filter-group">
          <p className="filter-group-title">Abteilung</p>
          <div className="filter-items">
            {departments.map((department) => {
              const checked = selectedDepartments.includes(department.name);
              return (
                <label key={department.name} className="filter-checkbox-row">
                  <span className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleDepartment(department.name)}
                    />
                    <span>{department.name}</span>
                  </span>
                  <span className="filter-count">{department.count}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="filter-group">
          <p className="filter-group-title">Standort</p>
          <div className="filter-items">
            {locations.map((location) => (
              <label key={location} className="filter-radio-row">
                <input
                  type="radio"
                  name="location"
                  checked={selectedLocation === location}
                  onChange={() => onSelectLocation(location)}
                />
                <span>{location}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="button" className="reset-button" onClick={onReset}>
          Filter zurücksetzen
        </button>
      </section>

      <section className="growth-card" aria-label="Team-Zuwachs">
        <h4>Team-Zuwachs</h4>
        <p>Diesen Monat wurden 5 neue Mitarbeiter begrüßt.</p>
        <button type="button">Details ansehen</button>
        <span
          className="material-symbols-outlined growth-icon"
          style={{ fontVariationSettings: '"FILL" 1' }}
          aria-hidden="true"
        >
          celebration
        </span>
      </section>
    </aside>
  );
};

export default memo(FiltersSidebar);
