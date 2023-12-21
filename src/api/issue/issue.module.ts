import { Global, Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';

Global();
@Module({
  providers: [IssueService],
  exports: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
