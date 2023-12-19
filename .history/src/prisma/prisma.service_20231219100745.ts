import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://root:__Arc%3F1912@localhost:5432/moola_contribution?schema=public',
        },
      },
    });
  }
}
