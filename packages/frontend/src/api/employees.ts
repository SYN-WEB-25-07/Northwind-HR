import type {
  DirectoryPage,
  EmployeeDirectoryEntry,
  EmployeeLocation,
  EmployeeStatus,
  EmployeesApiResponse,
  EmployeesApiRow,
  StatusTone
} from '../types/employee';

interface LoadEmployeesOptions {
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}

const statusCycle: EmployeeStatus[] = ['Aktiv', 'Remote', 'Im Urlaub', 'Aktiv'];
const toneCycle: StatusTone[] = ['green', 'blue', 'amber', 'green'];
const locationCycle: EmployeeLocation[] = ['Berlin (HQ)', 'Remote', 'München', 'Berlin (HQ)'];

const toAscii = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

const buildEmail = (firstName: string, lastName: string): string => {
  const localPart = `${firstName.charAt(0)}.${lastName}`;
  return `${toAscii(localPart)}@hrcentral.de`;
};

const buildPhone = (id: number): string => {
  const seed = String((id * 73) % 1_000_000)
    .padStart(6, '0')
    .slice(0, 6);
  return `+49 15${seed.slice(0, 1)} ${seed.slice(1)}`;
};

export const mapApiRowsToDirectory = (rows: EmployeesApiRow[]): EmployeeDirectoryEntry[] => {
  return rows.map((row, index) => {
    const status = statusCycle[index % statusCycle.length];
    const tone = toneCycle[index % toneCycle.length];
    const location = locationCycle[index % locationCycle.length];
    return {
      employeeCode: `HR-${String(row.id).padStart(4, '0')}`,
      fullName: `${row.first_name} ${row.last_name}`,
      role: row.title,
      department: row.dept_name,
      status,
      statusTone: tone,
      email: buildEmail(row.first_name, row.last_name),
      phone: buildPhone(row.id),
      avatar: '',
      location,
      presenceTone: tone
    };
  });
};

export const loadEmployeesPage = async (
  options: LoadEmployeesOptions = {}
): Promise<DirectoryPage> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;

  const response = await fetch(`/api/employees?page=${page}&limit=${limit}`, {
    signal: options.signal
  });

  if (!response.ok) {
    throw new Error(`Failed to load employees: ${response.status}`);
  }

  const payload = (await response.json()) as EmployeesApiResponse;
  return {
    rows: mapApiRowsToDirectory(payload.data),
    total: payload.pagination.total,
    page: payload.pagination.page,
    pages: payload.pagination.pages,
    limit: payload.pagination.limit
  };
};
