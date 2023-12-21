import { Global, Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';

@Global()
@Module({
  providers: [ContributionService],
  exports: [ContributionService],
})
export class ContributionModule {}
