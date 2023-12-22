import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ContributionDto, ContributionService } from './contribution.service';
import { Contribution } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contribution Endpoints')
@Controller('contributions')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAllContributions(): Promise<Contribution[]> {
    return this.contributionService.getAllContributions();
  }

  @Get(':id')
  async getContributionById(
    @Param('id', ParseIntPipe) contributionId: number,
  ): Promise<Contribution | null> {
    return this.contributionService.getContributionById(contributionId);
  }

  @Post()
  async createContribution(
    @Body() contributionDto: ContributionDto,
  ): Promise<Contribution> {
    return this.contributionService.createContribution(contributionDto);
  }

  @Put(':id')
  async updateContribution(
    @Param('id', ParseIntPipe) contributionId: number,
    @Body() updates: Partial<Contribution>,
  ): Promise<Contribution> {
    return this.contributionService.updateContribution(contributionId, updates);
  }

  @Delete(':id')
  async deleteContribution(
    @Param('id', ParseIntPipe) contributionId: number,
  ): Promise<void> {
    return this.contributionService.deleteContribution(contributionId);
  }

  @Get('group/:groupId')
  async getContributionsByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<Contribution[]> {
    return this.contributionService.getContributionsByGroup(groupId);
  }

  @Get('total/group/:groupId')
  async getTotalGroupContribution(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<number> {
    return this.contributionService.getTotalGroupContribution(groupId);
  }

  @Get('user/:userId')
  async getContributionsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Contribution[]> {
    return this.contributionService.getContributionsByUser(userId);
  }

  @Get('group/:groupId/user/:userId')
  async getContributionsByGroupAndUser(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Contribution[]> {
    return this.contributionService.getContributionsByGroupAndUser(
      groupId,
      userId,
    );
  }

  @Get('total/user/:userId')
  async getTotalUserContribution(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<number> {
    return this.contributionService.getTotalUserContribution(userId);
  }

  @Get('total/user/:userId/group/:groupId')
  async getTotalUserContributionInGroup(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<number> {
    return this.contributionService.getTotalUserContributionInGroup(
      userId,
      groupId,
    );
  }

  @Get('can-contribute/user/:userId/group/:groupId')
  async canUserContribute(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<boolean> {
    return this.contributionService.canUserContribute(userId, groupId);
  }
}
