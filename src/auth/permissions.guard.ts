import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.subjects) return false;

    // user.subjects is array like [{ subject: 'Invoices', role: 'Editor' }, ...]
    const userPermissions = user.subjects.map(s => `${s.subject}:${s.role}`);

    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
}
