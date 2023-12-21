import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';

@Module({
  imports: [IssueService],
  exports: [IssueService],
})
export class IssueModule {}
