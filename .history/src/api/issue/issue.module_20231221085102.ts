import { Global, Module } from '@nestjs/common';
import { IssueService } from './issue.service';

Global();
@Module({
  imports: [IssueService],
  exports: [IssueService],
})
export class IssueModule {}
