import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  fetchHeadcount,
  fetchSalaryDistribution,
  fetchGenderDistribution,
  fetchDeptSalaryAvg,
} from '../api/reports';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff6361', '#bc5090', '#36a2eb', '#e7e9ed', '#003f5c'];

export default function Dashboard() {
  const [headcount, setHeadcount] = useState<any[] | null>(null);
  const [salaryDist, setSalaryDist] = useState<any[] | null>(null);
  const [genderDist, setGenderDist] = useState<any[] | null>(null);
  const [deptAvg, setDeptAvg] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchHeadcount().then(setHeadcount),
      fetchSalaryDistribution().then(setSalaryDist),
      fetchGenderDistribution().then(setGenderDist),
      fetchDeptSalaryAvg().then(setDeptAvg),
    ]).catch((err) => { console.error(err); setError('Fehler beim Laden der Dashboard-Daten.'); });
  }, []);

  if (error) return <div style={{ padding: 20 }}>{error}</div>;
  if (!headcount || !salaryDist || !genderDist || !deptAvg) return <div style={{ padding: 20 }}>Dashboard wird geladen …</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
      <div className="filters-card">
        <h2 style={{ marginBottom: '1rem' }}>Mitarbeiter pro Abteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={headcount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="headcount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="filters-card">
        <h2 style={{ marginBottom: '1rem' }}>Gehaltsverteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={salaryDist} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100} label>
              {salaryDist.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="filters-card">
        <h2 style={{ marginBottom: '1rem' }}>Gender-Verteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={genderDist} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={100} label>
              {genderDist.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="filters-card">
        <h2 style={{ marginBottom: '1rem' }}>Durchschnittsgehalt pro Abteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deptAvg}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg_salary" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}