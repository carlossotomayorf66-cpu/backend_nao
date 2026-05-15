import { IUserRepository, User } from '../../domain/user.entity.js';
import { pool } from '../database/mysql.config.js';
import { ResultSetHeader } from 'mysql2';

export class MySQLUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async create(user: User): Promise<User> {
    const { name, email, password, role } = user;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return { ...user, id: result.insertId };
  }
}
