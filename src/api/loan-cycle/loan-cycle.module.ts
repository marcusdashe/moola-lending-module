import { Global, Module } from '@nestjs/common';
import { LoanCycleService } from './loan-cycle.service';
import { LoanCycleController } from './loan-cycle.controller';

@Global()
@Module({
  providers: [LoanCycleService],
  exports: [LoanCycleService],
  controllers: [LoanCycleController],
})
export class LoanCycleModule {}
