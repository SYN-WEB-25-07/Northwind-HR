import { memo, useMemo } from 'react';
import type { EmployeeDirectoryEntry } from '../types/employee';

interface EmployeeTableProps {
  employees: EmployeeDirectoryEntry[];
  totalEmployees: number;
  page: number;
  totalPages: number;
  from: number;
  to: number;
  onPageChange: (nextPage: number) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const EmployeeTable = ({
  employees,
  totalEmployees,
  page,
  totalPages,
  from,
  to,
  onPageChange,
  isLoading,
  errorMessage
}: EmployeeTableProps): JSX.Element => {
  const paginationIndexes = useMemo(() => {
    const maxVisiblePages = 3;
    const current = Math.min(Math.max(page, 1), totalPages);

    let start = Math.max(1, current - 1);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [page, totalPages]);

  return (
    <section className="directory-table-card" aria-label="Mitarbeiter-Verzeichnis Tabelle">
      <div className="table-scroll-wrap">
        <table className="directory-table">
          <thead>
            <tr>
              <th>
                <span>Mitarbeiter</span>
                <span className="material-symbols-outlined tiny-icon">unfold_more</span>
              </th>
              <th>Rolle / Abteilung</th>
              <th>Status</th>
              <th>Kontakt</th>
              <th className="th-actions">Aktionen</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="table-feedback-row">
                  Mitarbeiter werden geladen...
                </td>
              </tr>
            )}

            {!isLoading && errorMessage && (
              <tr>
                <td colSpan={5} className="table-feedback-row warning">
                  {errorMessage}
                </td>
              </tr>
            )}

            {!isLoading &&
              employees.map((employee, index) => (
                <tr key={`${employee.employeeCode}-${index}`}>
                  <td>
                    <div className="employee-main-cell">
                      <div className="avatar-wrap">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt={employee.fullName}
                            className="employee-avatar"
                            loading="lazy"
                          />
                        ) : (
                          <div className="employee-avatar avatar-fallback">
                            {employee.fullName
                              .split(' ')
                              .map((part) => part.charAt(0))
                              .join('')
                              .slice(0, 2)}
                          </div>
                        )}
                        <span className={`presence-dot tone-${employee.presenceTone}`} />
                      </div>
                      <div>
                        <p className="employee-name">{employee.fullName}</p>
                        <p className="employee-id">Mitarbeiter-ID: #{employee.employeeCode}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <p className="employee-role">{employee.role}</p>
                    <p className="employee-dept">{employee.department}</p>
                  </td>

                  <td>
                    <span className={`status-badge tone-${employee.statusTone}`}>
                      <span className={`status-dot tone-${employee.statusTone}`} />
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    <div className="contact-stack">
                      <p>
                        <span className="material-symbols-outlined tiny-icon">mail</span>
                        <span>{employee.email}</span>
                      </p>
                      <p>
                        <span className="material-symbols-outlined tiny-icon">call</span>
                        <span>{employee.phone}</span>
                      </p>
                    </div>
                  </td>

                  <td className="actions-cell">
                    <button type="button" className="icon-button" aria-label="Mehr Optionen">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}

            {!isLoading && !errorMessage && employees.length === 0 && (
              <tr>
                <td colSpan={5} className="table-feedback-row">
                  Keine Mitarbeiter für die aktuelle Suche gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>
          Zeige <strong>{from}</strong> bis <strong>{to}</strong> von <strong>{totalEmployees}</strong>{' '}
          Mitarbeitern
        </p>

        <div className="pagination-actions" aria-label="Pagination">
          <button
            type="button"
            className="page-arrow"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Vorherige Seite"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {paginationIndexes.map((index) => (
            <button
              key={index}
              type="button"
              className={`page-index ${index === page ? 'is-current' : ''}`}
              onClick={() => onPageChange(index)}
              aria-label={`Seite ${index}`}
              aria-current={index === page ? 'page' : undefined}
            >
              {index}
            </button>
          ))}

          <button
            type="button"
            className="page-arrow"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Nächste Seite"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(EmployeeTable);
