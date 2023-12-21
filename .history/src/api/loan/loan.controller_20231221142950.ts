import { Controller, Get, Delete } from '@nestjs/common';
import { LoanService } from './loan.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.getAllLoans();
  }
}
