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
    // Additional logic to ensure the group and recipient exist
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    const recipient = await this.prisma.user.findUnique({
      where: { pk: recipientId },
    });

    if (!group || !recipient) {
      throw new NotFoundException('Group or Recipient not found');
    }

    return this.prisma.loanCycle.create({
      data: {
        groupId,
        recipientId,
      },
    });
  }

  async updateLoanCycle(
    loanCycleId: number,
    updates: Partial<LoanCycle>,
  ): Promise<LoanCycle> {
    const existingLoanCycle = await this.prisma.loanCycle.findUnique({
      where: { id: loanCycleId },
    });

    if (!existingLoanCycle) {
      throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
    }

    return this.prisma.loanCycle.update({
      where: { id: loanCycleId },
      data: updates,
    });
  }

  async deleteLoanCycle(loanCycleId: number): Promise<void> {
    const existingLoanCycle = await this.prisma.loanCycle.findUnique({
      where: { id: loanCycleId },
    });

    if (!existingLoanCycle) {
      throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
    }

    await this.prisma.loanCycle.delete({ where: { id: loanCycleId } });
  }
}

export class LoanCycleDto {
  readonly groupId: number;
  readonly recipientId: number;
}
