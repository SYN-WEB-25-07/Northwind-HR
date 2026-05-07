import React from 'react';
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

const EmployeeTable: React.FC<EmployeeTableProps> = ({
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
      <section className="employee-table">
        <p>Daten werden geladen …</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="employee-table">
        <div className="error-banner">{errorMessage}</div>
      </section>
    );
  }

  return (
    <section className="employee-table">
      <div className="table-toolbar">
        <p>
          Zeige {from} bis {to} von {totalEmployees} Mitarbeitern
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>MITARBEITER</th>
            <th>ROLLE / ABTEILUNG</th>
            <th>STATUS</th>
            <th>KONTAKT</th>
            <th>AKTIONEN</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            // 🔧 Fallback: falls fullName fehlt, aus Vor‑ und Nachnamen zusammenbauen
            const fullName = employee.fullName || `${employee.first_name} ${employee.last_name}`;
            const [firstName, lastName] = fullName.split(' ');

            return (
              <tr key={employee.id || employee.fullName}>
                <td className="employee-info">
                  <div className="employee-name">
                    <span>{fullName}</span>
                    <small>Mitarbeiter-ID: #{employee.id}</small>
                  </div>
                </td>
                <td>
                  <div>{employee.role || employee.title}</div>
                  <small>{employee.department || employee.dept_name}</small>
                </td>
                <td>
                  <span className="status-badge">Aktiv</span>
                </td>
                <td>
                  <div className="contact-icons">
                    <span className="material-symbols-outlined">mail</span>
                    <span>{employee.email || '—'}</span>
                  </div>
                  <div className="contact-icons">
                    <span className="material-symbols-outlined">call</span>
                    <span>{employee.phone || '—'}</span>
                  </div>
                </td>
                <td>
                  <button className="action-button">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="pagination-button"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span>
          Seite {page} von {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="pagination-button"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  );
};

export default EmployeeTable;