import { Router } from 'express';
import pool from '../db';

const router = Router();

// GET /api/reports/headcount
router.get('/headcount', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT d.dept_name, COUNT(de.employee_id) AS headcount
      FROM employees.department d
      JOIN employees.department_employee de
        ON d.id = de.department_id
      WHERE de.to_date = '9999-01-01'
      GROUP BY d.dept_name
      ORDER BY headcount DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/reports/salary-distribution
router.get('/salary-distribution', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        CASE
          WHEN s.amount < 50000 THEN '<50k'
          WHEN s.amount BETWEEN 50000 AND 70000 THEN '50k-70k'
          WHEN s.amount BETWEEN 70001 AND 90000 THEN '70k-90k'
          ELSE '>90k'
        END AS range,
        COUNT(*) AS count
      FROM employees.salary s
      WHERE s.to_date = '9999-01-01'
      GROUP BY range
      ORDER BY MIN(s.amount)
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
