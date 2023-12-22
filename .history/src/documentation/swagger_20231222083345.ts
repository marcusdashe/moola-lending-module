/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';

export default function SwaggerInit(app: INestApplication) {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Freshpress RESTFul API')
    .setDescription('FreshPress API Official Documentation')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
}
