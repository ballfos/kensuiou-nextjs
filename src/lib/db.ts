// lib/db.ts
import { Pool } from 'pg';

// PostgreSQL接続設定
const pool = new Pool({
    user: process.env.PG_USER,       // PostgreSQLのユーザー名
    host: process.env.PG_HOST,       // ホスト名
    database: process.env.PG_DATABASE, // データベース名
    password: process.env.PG_PASSWORD, // パスワード
    port: Number(process.env.PG_PORT), // ポート番号
});

// データを取得する関数
export async function getDataFromDB(query: string, params: any[] = [])  {
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