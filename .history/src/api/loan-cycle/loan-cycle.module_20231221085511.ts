import { Global, Module } from '@nestjs/common';
import { LoanCycleService } from './loan-cycle.service';

@Global()
@Module({
  imports: [LoanCycleService],
  exports: [LoanCycleService],
})
export class LoanCycleModule {}
