import React from 'react';  // ⬅️ behebt 'Cannot find name ReactNode'

export interface DepartmentFilter {
  key: string;    // ⬅️ jetzt string, keine Funktion mehr
  label: string;
}

export interface EmployeeDirectoryEntry {
  // Diese drei Felder kommen sicher aus der API
  fullName: string;
  role: string;
  department: string;

  // Alle anderen sind optional, damit keine Fehler mehr
  first_name?: string;
  last_name?: string;
  title?: string;
  dept_name?: string;
  avatar?: string;
  location?: string;
  status?: string;
  email?: string;
  phone?: string;
  hireDate?: string;
  gender?: string;
  // … bei Bedarf weitere optionale Felder
}