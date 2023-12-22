/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export default function SwaggerInit(app: INestApplication) {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Moola Group Lending Module')
    .setDescription('Moola Group Lending API Official Documentation')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
}
