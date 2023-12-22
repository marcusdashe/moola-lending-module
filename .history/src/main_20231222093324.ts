import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerInit from './swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  });
  SwaggerInit(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(8000);
  logger.log(
    'Moola Group Lending Microservice is running on: http://localhost:8000',
  );
}
bootstrap();
