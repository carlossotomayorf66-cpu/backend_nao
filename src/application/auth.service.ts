import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository, User } from '../domain/user.entity.js';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(email: string, pass: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Credenciales inválidas');

    const isMatch = await bcrypt.compare(pass, user.password!);
    if (!isMatch) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
