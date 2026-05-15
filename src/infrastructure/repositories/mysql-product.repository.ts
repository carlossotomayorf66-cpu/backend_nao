import { IProductRepository, Product } from '../../domain/product.entity.js';
import { pool } from '../database/mysql.config.js';
import { ResultSetHeader } from 'mysql2';

export class MySQLProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows as Product[];
  }

  async findById(id: number): Promise<Product | null> {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    const products = rows as Product[];
    return products.length > 0 ? products[0] : null;
  }

  async create(product: Product): Promise<Product> {
    const { name, description, price, stock, category, image_url } = product;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category, image_url]
    );
    return { ...product, id: result.insertId };
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    const fields = Object.keys(product)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(product);

    if (fields.length === 0) return this.findById(id);

    await pool.query(`UPDATE products SET ${fields} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
