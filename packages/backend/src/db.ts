import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const connectionString = process.env.DATABASE_URL;
const useSsl =
  process.env.DB_SSL === 'true' ||
  (typeof connectionString === 'string' && connectionString.includes('railway'));

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

pool.on('error', (err) => console.error('DB Pool Error', err));

export default pool;
