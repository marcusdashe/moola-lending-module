import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Loan } from '@prisma/client';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async getAllLoans(): Promise<Loan[]> {
    return this.prisma.loan.findMany();
  }

  async getLoanById(loanId: number): Promise<Loan> {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    return loan;
  }

  async createLoan(
    amount: number,
    groupId: number,
    borrowerId: number,
    dueDate: Date,
  ): Promise<Loan> {
    return this.prisma.loan.create({
      data: {
        amount,
        groupId,
        borrowerId,
        dueDate,
      },
    });
  }

  async updateLoan(loanId: number, updates: Partial<Loan>): Promise<Loan> {
    const existingLoan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!existingLoan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    return this.prisma.loan.update({
      where: { id: loanId },
      data: updates,
    });
  }
}
