export type StatusTone = 'green' | 'blue' | 'amber';

export type EmployeeStatus = 'Aktiv' | 'Remote' | 'Im Urlaub';

export type EmployeeLocation = 'Berlin (HQ)' | 'München' | 'Remote';

export interface EmployeeDirectoryEntry {
  employeeCode: string;
  fullName: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  statusTone: StatusTone;
  email: string;
  phone: string;
  avatar: string;
  location: EmployeeLocation;
  presenceTone: StatusTone;
}

export interface DepartmentFilter {
  name: string;
  count: number;
  defaultSelected?: boolean;
}

export interface EmployeesApiRow {
  id: number;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  hire_date: string;
  dept_name: string;
  title: string;
}

export interface EmployeesApiResponse {
  data: EmployeesApiRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface DirectoryPage {
  rows: EmployeeDirectoryEntry[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}
