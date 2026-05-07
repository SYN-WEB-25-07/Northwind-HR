export interface Employee {
  id: string;
  fullName: string;
  gender: string;
  hire_date: string;
  department: string;
  role: string;
}

export async function loadEmployeesPage({
  page,
  limit,
  signal,
  dept,
}: {
  page: number;
  limit: number;
  signal?: AbortSignal;
  dept?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (dept) params.set('dept', dept);

  const response = await fetch(`/api/employees?${params}`, { signal });
  if (!response.ok) throw new Error('API error');
  return response.json();
}