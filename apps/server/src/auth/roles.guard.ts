import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { ROLES_KEY } from './roles.decorator';
import type { AuthedRequest } from './auth.types';

/**
 * 权限校验：权限列表每次请求都从数据库实时读取，
 * 保证前端缓存被篡改、或权限被后台调整后立即生效。
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthedRequest>();
    if (!request.user) {
      throw new UnauthorizedException('未登录');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: request.user.sub },
      select: { permissions: true },
    });
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    let permissions: string[] = [];
    try {
      permissions = JSON.parse(user.permissions) as string[];
    } catch {
      permissions = [];
    }
    if (!requiredRoles.some((role) => permissions.includes(role))) {
      throw new ForbiddenException('无权访问');
    }
    return true;
  }
}
