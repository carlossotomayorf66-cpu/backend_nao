import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'gaby_user',
  password: process.env.DB_PASSWORD || 'gaby_secure_pass_2026',
  database: process.env.DB_NAME || 'empresa_gaby',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos MySQL establecida correctamente.');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}
