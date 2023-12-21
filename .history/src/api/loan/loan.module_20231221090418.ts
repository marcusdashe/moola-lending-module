import { Global, Module } from '@nestjs/common';
import { LoanService } from './loan.service';

@Global()
@Module({
  providers: [LoanService],
  exports: [LoanService],
  controllers: [],
})
export class LoanModule {}
