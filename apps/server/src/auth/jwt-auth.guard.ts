import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthedRequest, JwtPayload } from './auth.types';

/** 校验 Authorization: Bearer <token>，通过后把载荷挂到 request.user */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('未登录');
    }
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('登录已过期，请重新登录');
    }
    request.user = payload;
    return true;
  }

  private extractToken(request: AuthedRequest): string | null {
    const [type, token] = (request.headers.authorization ?? '').split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}
