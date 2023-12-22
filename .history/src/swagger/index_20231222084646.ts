/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ContributionModule } from 'src/api/contribution/contribution.module';
import { GroupModule } from 'src/api/group/group.module';
import { IssueModule } from 'src/api/issue/issue.module';
import { LoanCycleModule } from 'src/api/loan-cycle/loan-cycle.module';
import { LoanModule } from 'src/api/loan/loan.module';
import { NotificationModule } from 'src/api/notification/notification.module';
import { UserModule } from 'src/api/user/user.module';
import { AppModule } from 'src/app.module';

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
    include: [
      AppModule,
      ContributionModule,
      GroupModule,
      IssueModule,
      LoanModule,
      LoanCycleModule,
      NotificationModule,
      UserModule,
    ],
  });

  SwaggerModule.setup(
    '/moola-contribution/api/doc',
    app,
    document,
    customOptions,
  );
}
