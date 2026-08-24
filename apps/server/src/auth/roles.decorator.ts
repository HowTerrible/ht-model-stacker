import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/** 声明访问接口所需权限码，配合 RolesGuard 使用 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
