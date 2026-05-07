import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend // <-- Legend hinzugefügt
} from 'recharts';
import {
  fetchHeadcount,
  fetchSalaryDistribution,
  fetchGenderDistribution,
  fetchDeptSalaryAvg,
} from '../api/reports';

const COLORS =['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff6361', '#bc5090', '#36a2eb', '#e7e9ed', '#003f5c'];

export default function Dashboard() {
  const [headcount, setHeadcount] = useState<any[] | null>(null);
  const [salary, setSalary] = useState<any[] | null>(null);
  const [gender, setGender] = useState<any[] | null>(null);
  const [deptAvg, setDeptAvg] = useState<any[] | null>(null);

  useEffect(() => {
    // BarCharts kommen oft mit Strings auf der Y-Achse klar, PieCharts nicht. 
    // Wir erzwingen hier bei count und avg_salary das Format Number()
    
    fetchHeadcount()
      .then(data => setHeadcount(data.map((d: any) => ({ ...d, headcount: Number(d.headcount) }))))
      .catch(() => setHeadcount([]));
      
    fetchSalaryDistribution()
      .then(data => setSalary(data.map((d: any) => ({ ...d, count: Number(d.count) }))))
      .catch(() => setSalary([]));
      
    fetchGenderDistribution()
      .then(data => setGender(data.map((d: any) => ({ ...d, count: Number(d.count) }))))
      .catch(() => setGender([]));
      
    fetchDeptSalaryAvg()
      .then(data => setDeptAvg(data.map((d: any) => ({ ...d, avg_salary: Number(d.avg_salary) }))))
      .catch(() => setDeptAvg([]));
  },[]);

  const renderChart = (title: string, chart: React.ReactNode) => (
    <div className="filters-card">
      <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
      {chart}
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
      {renderChart('Mitarbeiter pro Abteilung',
        headcount ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={headcount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="headcount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>Lädt…</p>
      )}

      {renderChart('Gehaltsverteilung',
        salary ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={salary} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100} label>
                {salary.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : <p>Lädt…</p>
      )}

      {renderChart('Gender-Verteilung',
        gender ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={gender} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={100} label>
                {gender.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : <p>Lädt…</p>
      )}

      {renderChart('Durchschnittsgehalt pro Abteilung',
        deptAvg ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptAvg}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg_salary" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>Lädt…</p>
      )}
    </div>
  );
}