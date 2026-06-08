import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // ✅ Get roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // ✅ If no roles defined → allow
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // ❌ If no user → block
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // ❌ If role not allowed → block
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied. Required role: ${requiredRoles.join(', ')}`,
      );
    }

    // ✅ Allowed
    return true;
  }
}