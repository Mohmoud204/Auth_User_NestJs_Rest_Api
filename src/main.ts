import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { cors } from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  // app.enableCors({
//     origin: "*",
//     methods:["GET","POST","PUT","PATCH","DELETE"]
//   });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(process.env.PORT_SERVER);
}
bootstrap();
