import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { LoginDto, LoginResponseDto } from '../common/dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { employeeNumber: loginDto.employeeNumber },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 간단한 JWT 토큰 생성 (실제 프로덕션에서는 @nestjs/jwt 사용 권장)
    const accessToken = this.generateSimpleToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        employeeNumber: user.employeeNumber,
        name: user.name,
      },
    };
  }

  private generateSimpleToken(user: User): string {
    // 실제 프로덕션에서는 JWT 라이브러리 사용
    return Buffer.from(`${user.id}:${user.employeeNumber}`).toString('base64');
  }

  async validateToken(token: string): Promise<User> {
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [userId, employeeNumber] = decoded.split(':');

      const user = await this.userRepository.findOne({
        where: { id: parseInt(userId), employeeNumber },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
