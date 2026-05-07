export async function loadEmployeesPage({
  page,
  limit,
  signal,
  dept,
}: {
  page: number;
  limit: number;
  signal?: AbortSignal;
  dept?: string;                     // ← neu
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (dept) params.set('dept', dept); // Abteilung an das Backend

  const response = await fetch(`/api/employees?${params}`, { signal });
  if (!response.ok) throw new Error('API error');
  return response.json();
}