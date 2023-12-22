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

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
    },
    customSiteTitle: 'Moola Group Lending API',
    useGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, documentConfig, {
    operationIdFactory: (_controlerKey, methodKey) => methodKey,
    include: [AppModule, PersonModule],
  });

  SwaggerModule.setup(
    '/moola-contribution/api/doc',
    app,
    document,
    customOptions,
  );
}
