// lib/db.ts
import { Pool } from 'pg';

// PostgreSQL接続設定
const pool = new Pool({
    user: process.env.POSTGRES_USER,       
    host: process.env.POSTGRES_HOST,       
    database: process.env.POSTGRES_DATABASE, 
    password: process.env.POSTGRES_PASSWORD, 
    port: Number(process.env.POSTGRES_PORT), 
});

// データを取得する関数
export async function getDataFromDB(query: string, params: string[] = [])  {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return result.rows; // 結果の行を返す
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}