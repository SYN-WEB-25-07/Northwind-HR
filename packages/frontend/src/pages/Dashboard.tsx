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
  const [headcount, setHeadcount] = useState<any[]>([]);
  const [salaryDist, setSalaryDist] = useState<any[]>([]);
  const [genderDist, setGenderDist] = useState<any[]>([]);
  const [deptAvg, setDeptAvg] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchHeadcount(),
      fetchSalaryDistribution(),
      fetchGenderDistribution(),
      fetchDeptSalaryAvg(),
    ])
      .then(([h, s, g, d]) => {
        setHeadcount(h);
        setSalaryDist(s);
        setGenderDist(g);
        setDeptAvg(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Dashboard wird geladen…</div>;

  return (
    <div className="dashboard-grid">
      <section className="card">
        <h2>Mitarbeiter pro Abteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={headcount}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="headcount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>
      <section className="card">
        <h2>Gehaltsverteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={salaryDist} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100} label>
              {salaryDist.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
      <section className="card">
        <h2>Gender-Verteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={genderDist} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={100} label>
              {genderDist.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>
      <section className="card">
        <h2>Durchschnittsgehalt pro Abteilung</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deptAvg}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg_salary" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}