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
}
