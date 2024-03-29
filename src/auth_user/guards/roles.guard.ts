import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../dto/role.enum';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const x = requiredRoles.some((role) => user.role?.includes(role));
    if(!x) throw new UnauthorizedException("You are not an Admin");
    return x;
  }
}
