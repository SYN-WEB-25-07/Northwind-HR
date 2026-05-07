import adminAvatar from '../assets/avatars/admin-user.jpg';
import elenaAvatar from '../assets/avatars/elena-fischer.jpg';
import markusAvatar from '../assets/avatars/markus-weber.jpg';
import sarahAvatar from '../assets/avatars/sarah-schmidt.jpg';
import thomasAvatar from '../assets/avatars/thomas-mueller.jpg';
import type { DepartmentFilter, EmployeeDirectoryEntry, EmployeeLocation } from '../types/employee';

export const adminProfile = {
  name: 'Admin-Benutzer',
  role: 'HR MANAGER',
  avatar: adminAvatar
};

export const departmentFilters: DepartmentFilter[] = [
  { name: 'Engineering', count: 42, defaultSelected: true },
  { name: 'Marketing', count: 18 },
  { name: 'Personalwesen', count: 12 },
  { name: 'Finanzen', count: 7 }
];

export const locationFilters: EmployeeLocation[] = ['Berlin (HQ)', 'München', 'Remote'];

export const totalEmployeesSnapshot = 79;

export const directoryEmployees: EmployeeDirectoryEntry[] = [
  {
    employeeCode: 'HR-9021',
    fullName: 'Markus Weber',
    role: 'Senior Frontend Entwickler',
    department: 'Engineering',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'm.weber@hrcentral.de',
    phone: '+49 151 456789',
    avatar: markusAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9045',
    fullName: 'Sarah Schmidt',
    role: 'Head of Marketing',
    department: 'Marketing',
    status: 'Remote',
    statusTone: 'blue',
    email: 's.schmidt@hrcentral.de',
    phone: '+49 172 987654',
    avatar: sarahAvatar,
    location: 'Remote',
    presenceTone: 'blue'
  },
  {
    employeeCode: 'HR-8812',
    fullName: 'Thomas Müller',
    role: 'HR Business Partner',
    department: 'Personalwesen',
    status: 'Im Urlaub',
    statusTone: 'amber',
    email: 't.mueller@hrcentral.de',
    phone: '+49 160 112233',
    avatar: thomasAvatar,
    location: 'München',
    presenceTone: 'amber'
  },
  {
    employeeCode: 'HR-9102',
    fullName: 'Elena Fischer',
    role: 'Financial Analyst',
    department: 'Finanzen',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'e.fischer@hrcentral.de',
    phone: '+49 155 334455',
    avatar: elenaAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'green'
  }
];
