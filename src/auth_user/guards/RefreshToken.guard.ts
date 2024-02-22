import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("You are not registered...");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.PASSWORD_TOKEN as any,
      });

      request['refresh'] = payload.id;
      
    } catch {
      throw new ForbiddenException("Log in again");
    }
    return true;
  }

  private extractTokenFromHeader(@Req() request: Request): string | undefined {
    const token = request.cookies['token'];
    return token;
  }
}
