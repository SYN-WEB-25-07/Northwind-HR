import React from 'react';

export interface DepartmentFilter {
  key: string;
  label: string;
}

export interface EmployeeDirectoryEntry {
  // Neu hinzugefügte optionale Felder für die Tabelle
  id?: string;
  email?: string;
  phone?: string;

  // Basis-Felder aus der neuen API
  fullName: string;
  role: string;
  department: string;

  // Felder aus der alten API (als Fallback, falls vorhanden)
  first_name?: string;
  last_name?: string;
  title?: string;
  dept_name?: string;

  // Weitere optionale Felder (aus dem ursprünglichen Interface)
  avatar?: string;
  location?: string;
  status?: string;
  hireDate?: string;
  gender?: string;
}