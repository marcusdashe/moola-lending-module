import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
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

  @Put(':id')
  async updateIssue(
    @Param('id', ParseIntPipe) issueId: number,
    @Body() updates: Partial<Issue>,
  ): Promise<Issue> {
    return this.issueService.updateIssue(issueId, updates);
  }

  @Delete(':id')
  async deleteIssue(@Param('id', ParseIntPipe) issueId: number): Promise<void> {
    return this.issueService.deleteIssue(issueId);
  }

  @Get('user/:userId')
  async getIssuesByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Issue[]> {
    return this.issueService.getIssuesByUser(userId);
  }

  @Put(':id/resolve')
  async resolveIssue(
    @Param('id', ParseIntPipe) issueId: number,
  ): Promise<Issue> {
    return this.issueService.resolveIssue(issueId);
  }
}
