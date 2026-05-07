export interface Employee {
  emp_no: number;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  hire_date: string;
  birth_date: string;
  salary?: number;
  title?: string;
  dept_name?: string;
}

export interface HeadCountRow {
  dept_name: string;
  headcount: number;
}

export interface SalaryDistRow {
  range: string;
  count: number;
}

export interface HeadCountRow {
  dept_name: string;
  headcount: number;
}

export interface SalaryDistRow {
  range: string;
  count: number;
}

export interface GenderDistRow {
  gender: string;
  count: number;
}

export interface DeptSalaryAvgRow {
  dept_name: string;
  avg_salary: number;
  employee_count: number;
}
