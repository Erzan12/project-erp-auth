import { Injectable } from '@nestjs/common';
import { User, SubjectRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  async create(userData: Omit<User, 'id' | 'passwordHash'> & { password: string }): Promise<User> {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    const newUser: User = {
      id: this.idCounter++,
      passwordHash,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }
}
