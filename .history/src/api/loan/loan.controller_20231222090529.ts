import {
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Body,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { Loan } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Loan Endpoints')
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.getAllLoans();
  }

  @Get(':id')
  async getLoanById(@Param('id', ParseIntPipe) loanId: number): Promise<Loan> {
    return this.loanService.getLoanById(loanId);
  }

  // Uncomment and adjust the endpoint as needed for creating loans
  // @Post()
  // async createLoan(@Body() loanDto: CreateLoanDto): Promise<Loan> {
  //   return this.loanService.createLoan(loanDto);
  // }
  @Put(':id')
  async updateLoan(
    @Param('id', ParseIntPipe) loanId: number,
    @Body() updates: Partial<Loan>,
  ): Promise<Loan> {
    return this.loanService.updateLoan(loanId, updates);
  }

  @Delete(':id')
  async deleteLoan(@Param('id', ParseIntPipe) loanId: number): Promise<void> {
    return this.loanService.deleteLoan(loanId);
  }

  @Get('group/:groupId')
  async getLoansByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<Loan[]> {
    return this.loanService.getLoansByGroup(groupId);
  }

  @Get('borrower/:borrowerId')
  async getLoansByBorrower(
    @Param('borrowerId', ParseIntPipe) borrowerId: number,
  ): Promise<Loan[]> {
    return this.loanService.getLoansByBorrower(borrowerId);
  }

  @Get('active/group/:groupId')
  async getActiveLoansByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<Loan[]> {
    return this.loanService.getActiveLoansByGroup(groupId);
  }
}
