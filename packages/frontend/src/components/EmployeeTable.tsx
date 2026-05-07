import React from 'react';
import type { EmployeeDirectoryEntry } from '../types/employee';

interface Props {
  employees: EmployeeDirectoryEntry[];
  totalEmployees: number;
  page: number;
  totalPages: number;
  from: number;
  to: number;
  onPageChange: (p: number) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const EmployeeTable: React.FC<Props> = ({
  employees,
  totalEmployees,
  page,
  totalPages,
  from,
  to,
  onPageChange,
  isLoading,
  errorMessage,
}) => {
  if (isLoading) {
    return (
      <div className="directory-table-card">
        <div className="table-feedback-row">Daten werden geladen …</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="directory-table-card">
        <div className="table-feedback-row warning">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="directory-table-card">
      <div className="table-scroll-wrap">
        <table className="directory-table">
          <thead>
            <tr>
              <th>MITARBEITER</th>
              <th>ROLLE / ABTEILUNG</th>
              <th>STATUS</th>
              <th>KONTAKT</th>
              <th className="th-actions">AKTIONEN</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const fullName = emp.fullName || `${emp.first_name} ${emp.last_name}`;
              const [firstName, lastName] = fullName.split(' ');
              const avatarFallback = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

              return (
                <tr key={emp.id || fullName}>
                  <td>
                    <div className="employee-main-cell">
                      <div className="avatar-wrap">
                        {emp.avatar ? (
                          <img className="employee-avatar" src={emp.avatar} alt={fullName} />
                        ) : (
                          <div className="avatar-fallback employee-avatar">{avatarFallback}</div>
                        )}
                        <span className={`presence-dot tone-green`} />
                      </div>
                      <div>
                        <p className="employee-name">{fullName}</p>
                        <p className="employee-id">Mitarbeiter-ID: #{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="employee-role">{emp.role || emp.title}</p>
                    <p className="employee-dept">{emp.department || emp.dept_name}</p>
                  </td>
                  <td>
                    <span className="status-badge tone-green">
                      <span className="status-dot tone-green" />
                      Aktiv
                    </span>
                  </td>
                  <td>
                    <div className="contact-stack">
                      <p>
                        <span className="material-symbols-outlined">mail</span>
                        {emp.email || '—'}
                      </p>
                      <p>
                        <span className="material-symbols-outlined">call</span>
                        {emp.phone || '—'}
                      </p>
                    </div>
                  </td>
                  <td className="actions-cell">
                    <button className="icon-button">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>
          Zeige <strong>{from}</strong> bis <strong>{to}</strong> von{' '}
          <strong>{totalEmployees}</strong> Mitarbeitern
        </p>
        <div className="pagination-actions">
          <button
            className="page-arrow"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-index ${page === i + 1 ? 'is-current' : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-arrow"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;