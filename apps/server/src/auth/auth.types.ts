import type { Request } from 'express';

/** JWT 载荷：只放用户标识，权限始终从数据库实时读取 */
export interface JwtPayload {
  sub: number;
  nickname: string;
}

export type AuthedRequest = Request & { user?: JwtPayload };
