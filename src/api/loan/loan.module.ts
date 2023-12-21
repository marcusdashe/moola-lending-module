import { Global, Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';

@Global()
@Module({
  providers: [LoanService],
  exports: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
