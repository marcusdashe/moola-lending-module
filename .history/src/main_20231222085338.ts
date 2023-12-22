import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerInit from './swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  });
  SwaggerInit(app);
  await app.listen(8000);
  logger.log('Moola Lending Microservice is running on: http://localhost:8000');
}
bootstrap();
