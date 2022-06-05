import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { permit } from './permitio';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'passport-jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!routePermissions) {
      return false;
    }

    const category: string = routePermissions[0].split(':')[0];
    const action: string = routePermissions[0].split(':')[1];
    console.log('category: ', category);
    console.log('action: ', action);

    const token = context
      .switchToHttp()
      .getRequest()
      .headers['authorization'].split(' ')[1];

    return this.getPermitted(token, action, category);
  }

  async getPermitted(
    token: string,
    action: string,
    category: string,
  ): Promise<boolean> {
    const user: string = this.getUserFromPayload(token);
    const permitted = await permit.check(user, action, category);
    console.log('permitted: ', permitted);
    return permitted;
  }

  getUserFromPayload(token: string): string {
    const decodedToken: JwtPayload = this.jwtService.decode(token);
    const userId = decodedToken.email;
    return userId;
  }
}
