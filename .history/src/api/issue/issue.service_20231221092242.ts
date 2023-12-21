import { Injectable, NotFoundException } from '@nestjs/common';
import { Issue } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}

  async getAllIssues(): Promise<Issue[]> {
    return this.prisma.issue.findMany();
  }

  async getIssueById(issueId: number): Promise<Issue> {
    const issue = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${issueId} not found`);
    }

    return issue;
  }

  // async createIssue(title: string, description: string): Promise<Issue> {
  //   return this.prisma.issue.create({
  //     data: {},
  //   });
  // }

  async updateIssue(issueId: number, updates: Partial<Issue>): Promise<Issue> {
    const existingIssue = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      throw new NotFoundException(`Issue with ID ${issueId} not found`);
    }

    return this.prisma.issue.update({
      where: { id: issueId },
      data: updates,
    });
  }

  async deleteIssue(issueId: number): Promise<void> {
    const existingIssue = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!existingIssue) {
      throw new NotFoundException(`Issue with ID ${issueId} not found`);
    }

    await this.prisma.issue.delete({ where: { id: issueId } });
  }
}

export class IssueDto {
  readonly title: string;
  readonly description: string;
}
