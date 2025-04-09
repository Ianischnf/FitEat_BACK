import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Récupère les rôles autorisés définis avec le décorateur @Roles()
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // 2. S’il n’y a pas de rôles définis, on autorise l'accès
    if (!requiredRoles) return true;

    // 3. Récupère l'utilisateur depuis la requête HTTP
    const { user } = context.switchToHttp().getRequest();

    // 4. Vérifie si le rôle de l'utilisateur est autorisé
    return requiredRoles.includes(user.role);
  }
}
