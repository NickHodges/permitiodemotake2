import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { permit } from './permitio';
import { JwtService } from '@nestjs/jwt';
import jwtDecode, { JwtPayload } from 'jwt-decode';

//import { JwtPayload } from 'passport-jwt';

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

    if (!routePermissions || !routePermissions[0]) {
      return false;
    }

    const category: string = routePermissions[0].split(':')[0];
    const action: string = routePermissions[0].split(':')[1];

    let token: string = context.switchToHttp().getRequest().headers[
      'authorization'
    ];

    if (!token) {
      return false;
    }

    token = token.split(' ')[1];

    token = JSON.stringify(token);

    return this.getPermitted(token, action, category);
  }

  async getPermitted(
    token: string,
    action: string,
    category: string,
  ): Promise<boolean> {
    try {
      let user: string = this.getUserFromPayload(token);
      console.log('user: ', user);
      const permitted = await permit.check(user, action, category);
      console.log('permitted: ', permitted);
      return permitted;
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }

  getUserFromPayload(token: string): string {
    //console.log('token: ', token);
    if (!token) {
      return '';
    }
    const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type//this.jwtService.decode(token, );
    if (!decodedToken) {
      return 'decodedToken is null or undefined';
    }
    console.log('decodedToken: ', decodedToken);
    return decodedToken['http://permit.io/user_email'];
  }
}
