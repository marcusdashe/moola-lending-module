import { Global, Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';

@Global()
@Module({
  providers: [ContributionService],
  exports: [ContributionService],
  controllers: [ContributionController],
})
export class ContributionModule {}
