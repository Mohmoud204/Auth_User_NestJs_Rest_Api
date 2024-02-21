import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { User } from './entities/auth_user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.PASSWORD_TOKEN as any,
      signOptions: { expiresIn: '20m' },
    }),
  ],

  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
