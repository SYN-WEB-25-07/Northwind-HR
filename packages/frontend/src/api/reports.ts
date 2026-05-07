const BASE = '/api/reports';

export const fetchHeadcount = () => fetch(`${BASE}/headcount`).then(r => r.json());
export const fetchSalaryDistribution = () => fetch(`${BASE}/salary-distribution`).then(r => r.json());
export const fetchGenderDistribution = () => fetch(`${BASE}/gender-distribution`).then(r => r.json());
export const fetchDeptSalaryAvg = () => fetch(`${BASE}/department-salary-avg`).then(r => r.json());