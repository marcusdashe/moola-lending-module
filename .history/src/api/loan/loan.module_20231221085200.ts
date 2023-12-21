import { Global, Module } from '@nestjs/common';
import { LoanService } from './loan.service';

@Global()
@Module({
  imports: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
