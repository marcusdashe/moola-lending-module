import { Injectable } from '@nestjs/common';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}
}
