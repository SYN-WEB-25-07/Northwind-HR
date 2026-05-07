import { Router } from 'express';
import pool from '../db';

const router = Router();

// GET /api/employees – Pagination + Filter (Mehrfach)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const deptParam = req.query.dept as string | undefined;

    let query = `
      SELECT e.id,
             e.first_name || ' ' || e.last_name AS "fullName",
             e.gender,
             e.hire_date,
             d.dept_name AS "department",
             t.title AS "role"
      FROM employees.employee e
      JOIN employees.department_employee de ON e.id = de.employee_id
      JOIN employees.department d ON de.department_id = d.id
      JOIN employees.title t ON e.id = t.employee_id
      WHERE de.to_date = '9999-01-01'
        AND t.to_date = '9999-01-01'
    `;
    const params: any[] = [];

    // Mehrfachfilter – Komma‑Liste
    if (deptParam) {
      const depts = deptParam.split(',').map(d => d.trim()).filter(d => d.length > 0);
      if (depts.length > 0) {
        query += ` AND d.dept_name IN (${depts.map((_, i) => `$${params.length + i + 1}`).join(',')})`;
        params.push(...depts);
      }
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM employees.employee');
    const total = parseInt(countResult.rows[0].count, 10);

    params.push(limit);
    query += ` ORDER BY e.id LIMIT $${params.length}`;
    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const { rows } = await pool.query(query, params);

    res.json({
      data: rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ⚠️ top-paid MUSS VOR :id STEHEN
router.get('/top-paid', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT e.id, e.first_name, e.last_name, s.amount AS salary,
             t.title, d.dept_name
      FROM employees.employee e
      JOIN employees.salary s ON e.id = s.employee_id AND s.to_date = '9999-01-01'
      JOIN employees.title t ON e.id = t.employee_id AND t.to_date = '9999-01-01'
      JOIN employees.department_employee de ON e.id = de.employee_id AND de.to_date = '9999-01-01'
      JOIN employees.department d ON de.department_id = d.id
      ORDER BY s.amount DESC LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/employees/:id – Einzeldetail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT e.id,
              e.first_name || ' ' || e.last_name AS "fullName",
              e.gender,
              e.hire_date,
              s.amount AS salary,
              t.title AS "role",
              d.dept_name AS "department"
       FROM employees.employee e
       LEFT JOIN employees.salary s ON e.id = s.employee_id AND s.to_date = '9999-01-01'
       LEFT JOIN employees.title t ON e.id = t.employee_id AND t.to_date = '9999-01-01'
       LEFT JOIN employees.department_employee de ON e.id = de.employee_id AND de.to_date = '9999-01-01'
       LEFT JOIN employees.department d ON de.department_id = d.id
       WHERE e.id = $1`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;