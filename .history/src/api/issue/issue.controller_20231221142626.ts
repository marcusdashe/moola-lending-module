import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateIssueDto, IssueService } from './issue.service';
import { Issue } from '@prisma/client';

@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get()
  async getAllIssues(): Promise<Issue[]> {
    return this.issueService.getAllIssues();
  }

  @Get(':id')
  async getIssueById(
    @Param('id', ParseIntPipe) issueId: number,
  ): Promise<Issue | null> {
    return this.issueService.getIssueById(issueId);
  }

  @Post()
  async createIssue(@Body() issueDto: CreateIssueDto): Promise<Issue> {
    return this.issueService.createIssue(issueDto);
  }
}
