import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './auth_user/auth_user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthUserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_NAME_DATA_BASE,
      port: process.env.PORT_DATE_BASE as any,
      username: process.env.USER_NAME_DATE_BASE,
      password: process.env.PASSWORD_DATE_BASE,
      database: process.env.DATA_BASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
