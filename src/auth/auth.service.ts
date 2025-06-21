import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(userData: any): Promise<User> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) throw new UnauthorizedException('Email already exists');
    return this.usersService.create(userData);
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      position: user.position,
      department: user.department,
      company: user.company,
      subjects: user.subjects,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
