import { Global, Module } from '@nestjs/common';
import { IssueService } from './issue.service';

Global();
@Module({
  providers: [IssueService],
  exports: [IssueService],
  controllers: [],
})
export class IssueModule {}
