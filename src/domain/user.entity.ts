export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'employee';
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
