import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanCycle } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoanCycleService {
  constructor(private prisma: PrismaService) {}

  async getAllLoanCycles(): Promise<LoanCycle[]> {
    return this.prisma.loanCycle.findMany();
  }

  async getLoanCycleById(loanCycleId: number): Promise<LoanCycle> {
    const loanCycle = await this.prisma.loanCycle.findUnique({
      where: { id: loanCycleId },
    });

    if (!loanCycle) {
      throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
    }

    return loanCycle;
  }

  async createLoanCycle(
    groupId: number,
    recipientId: number,
  ): Promise<LoanCycle> {
    return this.prisma.loanCycle.create({
      data: {
        groupId,
        recipientId,
      },
    });
  }
}
