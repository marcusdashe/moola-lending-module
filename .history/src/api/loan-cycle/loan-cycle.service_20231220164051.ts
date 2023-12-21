import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoanCycleService {
  constructor(private prisma: PrismaService) {}

  async getAllLoanCycles(): Promise<LoanCycle[]> {
    return this.prisma.loanCycle.findMany();
  }

  async getLoanCycleById(loanCycleId: number) {
    return this.prisma.loanCycle.findUnique({ where: { id: loanCycleId } });
  }
}
