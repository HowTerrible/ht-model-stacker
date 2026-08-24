import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userId: number): Promise<{ token: string; user: User }> {
    // TODO 项目初期调试用：仅凭 userId 签发 token，接入真实登录时替换为凭证校验（密码 / 微信 OAuth）
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return { token: await this.signToken(user), user };
  }

  async getMe(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  private signToken(user: User): Promise<string> {
    const payload: JwtPayload = { sub: user.id, nickname: user.nickname };
    return this.jwtService.signAsync(payload);
  }
}
