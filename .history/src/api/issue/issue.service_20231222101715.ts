import { Injectable, NotFoundException } from '@nestjs/common';
import { Issue } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}

  async getAllIssues(): Promise<Issue[]> {
    return this.prisma.issue.findMany();
  }

  async getIssueById(issueId: number): Promise<Issue | null> {
    const issue = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${issueId} not found`);
    }

    return issue;
  }

  async createIssue(issueDto: CreateIssueDto): Promise<Issue> {
    const { description, userId } = issueDto;

    return this.prisma.issue.create({
      data: {
        description,
        userId,
      },
    });
  }

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

  async getIssuesByUser(userId: number): Promise<Issue[]> {
    // Retrieve all issues reported by a specific user
    return this.prisma.issue.findMany({ where: { userId } });
  }

  async resolveIssue(issueId: number): Promise<Issue> {
    // Mark a specific issue as resolved
    return this.prisma.issue.update({
      where: { id: issueId },
      data: { isResolved: true },
    });
  }
}
