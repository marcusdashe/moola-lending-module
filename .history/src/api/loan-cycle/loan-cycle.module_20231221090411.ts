import { Global, Module } from '@nestjs/common';
import { LoanCycleService } from './loan-cycle.service';

@Global()
@Module({
  providers: [LoanCycleService],
  exports: [LoanCycleService],
  controllers: [],
})
export class LoanCycleModule {}
