import { Router } from 'express';
import pool from '../db';

const router = Router();

// GET /api/employees – Pagination, Filter
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const dept = req.query.dept as string;

    let query = `
      SELECT e.id, e.first_name, e.last_name, e.gender, e.hire_date,
             d.dept_name, t.title
      FROM employees.employee e
      JOIN employees.department_employee de ON e.id = de.employee_id
      JOIN employees.department d ON de.department_id = d.id
      JOIN employees.title t ON e.id = t.employee_id
      WHERE de.to_date = '9999-01-01'
        AND t.to_date = '9999-01-01'
    `;
    const params: any[] = [];

    if (dept) {
      params.push(dept);
      query += ` AND d.dept_name = $${params.length}`;
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
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
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
      `SELECT e.*, s.amount AS salary, t.title, d.dept_name
       FROM employees.employee e
       LEFT JOIN employees.salary s
         ON e.id = s.employee_id AND s.to_date = '9999-01-01'
       LEFT JOIN employees.title t
         ON e.id = t.employee_id AND t.to_date = '9999-01-01'
       LEFT JOIN employees.department_employee de
         ON e.id = de.employee_id AND de.to_date = '9999-01-01'
       LEFT JOIN employees.department d
         ON de.department_id = d.id
       WHERE e.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
