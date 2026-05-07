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
  },
  {
    employeeCode: 'HR-9177',
    fullName: 'Lea Koenig',
    role: 'Frontend Engineer',
    department: 'Engineering',
    status: 'Remote',
    statusTone: 'blue',
    email: 'l.koenig@hrcentral.de',
    phone: '+49 171 445566',
    avatar: markusAvatar,
    location: 'Remote',
    presenceTone: 'blue'
  },
  {
    employeeCode: 'HR-9190',
    fullName: 'Jonas Richter',
    role: 'Platform Engineer',
    department: 'Engineering',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'j.richter@hrcentral.de',
    phone: '+49 159 220011',
    avatar: thomasAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9133',
    fullName: 'Mia Hoffmann',
    role: 'Content Strategist',
    department: 'Marketing',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'm.hoffmann@hrcentral.de',
    phone: '+49 152 778899',
    avatar: sarahAvatar,
    location: 'München',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9241',
    fullName: 'Nico Brandt',
    role: 'Performance Marketing Manager',
    department: 'Marketing',
    status: 'Remote',
    statusTone: 'blue',
    email: 'n.brandt@hrcentral.de',
    phone: '+49 170 554433',
    avatar: sarahAvatar,
    location: 'Remote',
    presenceTone: 'blue'
  },
  {
    employeeCode: 'HR-9018',
    fullName: 'Katharina Vogel',
    role: 'HR Specialist',
    department: 'Personalwesen',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'k.vogel@hrcentral.de',
    phone: '+49 151 667788',
    avatar: elenaAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9057',
    fullName: 'Paul Becker',
    role: 'Talent Acquisition Partner',
    department: 'Personalwesen',
    status: 'Im Urlaub',
    statusTone: 'amber',
    email: 'p.becker@hrcentral.de',
    phone: '+49 162 339900',
    avatar: thomasAvatar,
    location: 'München',
    presenceTone: 'amber'
  },
  {
    employeeCode: 'HR-9270',
    fullName: 'Lukas Winter',
    role: 'Controller',
    department: 'Finanzen',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'l.winter@hrcentral.de',
    phone: '+49 153 889977',
    avatar: elenaAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9312',
    fullName: 'Nina Sommer',
    role: 'Accounting Specialist',
    department: 'Finanzen',
    status: 'Remote',
    statusTone: 'blue',
    email: 'n.sommer@hrcentral.de',
    phone: '+49 154 112244',
    avatar: sarahAvatar,
    location: 'Remote',
    presenceTone: 'blue'
  },
  {
    employeeCode: 'HR-9366',
    fullName: 'Erik Neumann',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Aktiv',
    statusTone: 'green',
    email: 'e.neumann@hrcentral.de',
    phone: '+49 156 998877',
    avatar: markusAvatar,
    location: 'Remote',
    presenceTone: 'green'
  },
  {
    employeeCode: 'HR-9404',
    fullName: 'Laura Klein',
    role: 'Employer Branding Manager',
    department: 'Marketing',
    status: 'Im Urlaub',
    statusTone: 'amber',
    email: 'l.klein@hrcentral.de',
    phone: '+49 157 223355',
    avatar: sarahAvatar,
    location: 'Berlin (HQ)',
    presenceTone: 'amber'
  },
  {
    employeeCode: 'HR-9475',
    fullName: 'Tobias Hartmann',
    role: 'Payroll Analyst',
    department: 'Finanzen',
    status: 'Aktiv',
    statusTone: 'green',
    email: 't.hartmann@hrcentral.de',
    phone: '+49 158 556677',
    avatar: thomasAvatar,
    location: 'München',
    presenceTone: 'green'
  }
];
