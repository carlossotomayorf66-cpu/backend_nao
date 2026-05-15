import { IClientRepository, Client } from '../../domain/client.entity.js';
import { pool } from '../database/mysql.config.js';
import { ResultSetHeader } from 'mysql2';

export class MySQLClientRepository implements IClientRepository {
  async findAll(): Promise<Client[]> {
    const [rows] = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
    return rows as Client[];
  }

  async findById(id: number): Promise<Client | null> {
    const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [id]);
    const clients = rows as Client[];
    return clients.length > 0 ? clients[0] : null;
  }

  async create(client: Client): Promise<Client> {
    const { first_name, last_name, email, phone, address } = client;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO clients (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, address]
    );
    return { ...client, id: result.insertId };
  }

  async update(id: number, client: Partial<Client>): Promise<Client | null> {
    const fields = Object.keys(client).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(client);
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE clients SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM clients WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
