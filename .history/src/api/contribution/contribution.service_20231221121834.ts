import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contribution } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async getAllContributions(): Promise<Contribution[]> {
    return this.prisma.contribution.findMany();
  }

  async getContributionById(
    contributionId: number,
  ): Promise<Contribution | null> {
    return this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });
  }

  async createContribution(
    contributionDto: ContributionDto,
  ): Promise<Contribution> {
    const { amount, userId, groupId } = contributionDto;

    if (amount <= 0)
      throw new BadRequestException('Invalid contribution amount');

    return this.prisma.contribution.create({
      data: {
        amount,
        userId,
        groupId,
      },
    });
  }

  async updateContribution(
    contributionId: number,
    updates: Partial<Contribution>,
  ): Promise<Contribution> {
    const existingContribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!existingContribution) {
      throw new NotFoundException(
        `Contribution with ID ${contributionId} not found`,
      );
    }

    return this.prisma.contribution.update({
      where: { id: contributionId },
      data: updates,
    });
  }

  async deleteContribution(contributionId: number): Promise<void> {
    const existingContribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!existingContribution) {
      throw new NotFoundException(
        `Contribution with ID ${contributionId} not found`,
      );
    }

    await this.prisma.contribution.delete({ where: { id: contributionId } });
  }
}

export class ContributionDto {
  readonly amount: number;
  readonly userId: number;
  readonly groupId: number;
}
