import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async getLoanById(loanId: number) {
    return this.prisma.loan.findUnique({ where: { id: loanId } });
  }
}
