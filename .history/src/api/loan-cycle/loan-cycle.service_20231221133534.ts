import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoanCycle, User } from '@prisma/client';
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

    // Additional logic to prevent updating certain properties if needed
    if (updates.groupId && updates.groupId !== existingLoanCycle.groupId)
      throw new BadRequestException('Cannot update loan cycle group');

    return this.prisma.loanCycle.update({
      where: { id: loanCycleId },
      data: updates,
    });
  }

  // async updateLoanCycle(
  //   loanCycleId: number,
  //   updates: Partial<LoanCycle>,
  // ): Promise<LoanCycle> {
  //   const existingLoanCycle = await this.prisma.loanCycle.findUnique({
  //     where: { id: loanCycleId },
  //   });

  //   if (!existingLoanCycle) {
  //     throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
  //   }

  //   return this.prisma.loanCycle.update({
  //     where: { id: loanCycleId },
  //     data: updates,
  //   });
  // }

  async deleteLoanCycle(loanCycleId: number): Promise<void> {
    const existingLoanCycle = await this.prisma.loanCycle.findUnique({
      where: { id: loanCycleId },
    });

    if (!existingLoanCycle) {
      throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
    }

    if (existingLoanCycle.isActive)
      throw new BadRequestException('Cannot delete active loan cycle');
    await this.prisma.loanCycle.delete({ where: { id: loanCycleId } });
  }

  async getActiveLoanCyclesByGroup(groupId: number): Promise<LoanCycle[]> {
    // Retrieve all active loan cycles associated with a specific group
    return this.prisma.loanCycle.findMany({
      where: { groupId, isActive: true },
    });
  }

  async getLoanCycleRecipients(loanCycleId: number): Promise<User> {
    // Retrieve all recipients associated with a specific loan cycle
    const loanCycle = await this.prisma.loanCycle.findUnique({
      where: { id: loanCycleId },
      include: { recipient: true },
    });

    if (!loanCycle) {
      throw new NotFoundException(`LoanCycle with ID ${loanCycleId} not found`);
    }

    return loanCycle.recipient;
  }

  async getActiveLoanCycleByGroupAndRecipient(
    groupId: number,
    recipientId: number,
  ): Promise<LoanCycle | null> {
    // Retrieve the active loan cycle for a specific group and recipient
    return this.prisma.loanCycle.findFirst({
      where: { groupId, recipientId, isActive: true },
    });
  }

  async getLoanCycleRecipientsByGroup(groupId: number): Promise<User[]> {
    // Retrieve all recipients associated with active loan cycles in a specific group
    const loanCycles = await this.prisma.loanCycle.findMany({
      where: { groupId, isActive: true },
      include: { recipient: true },
    });

    return loanCycles.reduce(
      (recipients, cycle) => recipients.concat(cycle.recipient),
      [],
    );
  }

  async canCreateLoanCycle(
    groupId: number,
    recipientId: number,
  ): Promise<boolean> {
    // Check if a loan cycle can be created for a specific group and recipient
    // Example: Check if the recipient is not already part of an active loan cycle in the group
    const activeLoanCycle = await this.getActiveLoanCycleByGroupAndRecipient(
      groupId,
      recipientId,
    );
    return !activeLoanCycle;
  }
}

export class LoanCycleDto {
  readonly groupId: number;
  readonly recipientId: number;
}
