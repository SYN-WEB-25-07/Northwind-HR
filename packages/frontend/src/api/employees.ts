export interface Employee {
  id: string;
  fullName: string;
  gender: string;
  hire_date: string;
  department: string;
  role: string;
}

interface PagePayload {
  rows: Employee[];
  total: number;
  pages: number;
  page: number;
}

export async function loadEmployeesPage({
  page,
  limit,
  signal,
}: {
  page: number;
  limit: number;
  signal?: AbortSignal;
}): Promise<PagePayload> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  const response = await fetch(`/api/employees?${params}`, { signal });
  if (!response.ok) throw new Error('API error');
  const json = await response.json();
  // API liefert { data: [...], pagination: {...} }
  return {
    rows: json.data as Employee[],
    total: json.pagination.total as number,
    pages: json.pagination.pages as number,
    page: json.pagination.page as number,
  };
}