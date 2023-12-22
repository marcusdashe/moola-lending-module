import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerInit from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  });
  SwaggerInit(app);
  await app.listen(3000);
}
bootstrap();
