import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Response } from 'express';
import { AuthUserService } from './auth_user.service';
import { SigninDto, LoginDto } from './dto/create-auth_user.dto';
import { UpdateAuthUserDto } from './dto/update-auth_user.dto';
import { BadRequestException } from '@nestjs/common';
import { AuthGuard } from './guards/guards.guard';
import { RefreshTokenGuard } from './guards/RefreshToken.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './dto/role.enum';
import { Roles } from './guards/roles.decorator';
import { JwtService } from '@nestjs/jwt';
@Controller('authUser')
export class AuthUserController {
  constructor(
    private readonly authUserService: AuthUserService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign')
  Sign(@Body() SigninDto: SigninDto) {
    return this.authUserService.Sign(SigninDto);
  }
  @Post('/login')
  async login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    
    return this.authUserService.Login(LoginDto,res);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/User')
  Findall(): Promise<SigninDto[]> {
    return this.authUserService.Findall();
  }
  @UseGuards(AuthGuard)
  @Get('/RefreshToken')
  RefreshToken(@Request() req) {
    return this.authUserService.RefreshToken(req.user.id);
  }
}
