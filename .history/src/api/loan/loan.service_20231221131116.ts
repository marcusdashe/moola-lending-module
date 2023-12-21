import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Loan } from '@prisma/client';

@Injectable()
export class LoanService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createLoan(loanDto: Loan): Promise<Loan> {
    const { amount, groupId, borrowerId, dueDate, interestRate } = loanDto;

    // Additional logic to enforce loan constraints if needed
    // Example:
    if (amount <= 0) throw new BadRequestException('Invalid loan amount');

    return this.prisma.loan.create({
      data: {
        amount,
        groupId,
        borrowerId,
        dueDate,
        interestRate,
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

  async deleteLoan(loanId: number): Promise<void> {
    const existingLoan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!existingLoan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    await this.prisma.loan.delete({ where: { id: loanId } });
  }
}

export class CreateLoanDto {
  readonly amount: number;
  readonly groupId: number;
  readonly borrowerId: number;
  readonly dueDate: Date;
  readonly interestRate?: number;
}
export class LoanDto {
  readonly amount: number;
  readonly groupId: number;
  readonly borrowerId: number;
  readonly dueDate: Date;
}
