import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contribution } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';

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
    contributionDto: CreateContributionDto,
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

    if (updates.amount && updates.amount !== existingContribution.amount)
      throw new BadRequestException('Cannot update contribution amount');

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

  async getContributionsByGroup(groupId: number): Promise<Contribution[]> {
    // Retrieve all contributions associated with a specific group
    return this.prisma.contribution.findMany({ where: { groupId } });
  }

  async getTotalGroupContribution(groupId: number): Promise<number> {
    // Calculate the total contribution amount for a specific group
    const contributions = await this.prisma.contribution.findMany({
      where: { groupId },
    });
    return contributions.reduce(
      (total, contribution) => total + contribution.amount,
      0,
    );
  }

  async getContributionsByUser(userId: number): Promise<Contribution[]> {
    // Retrieve all contributions made by a specific user
    return this.prisma.contribution.findMany({ where: { userId } });
  }

  async getContributionsByGroupAndUser(
    groupId: number,
    userId: number,
  ): Promise<Contribution[]> {
    // Retrieve all contributions made by a specific user in a specific group
    return this.prisma.contribution.findMany({ where: { groupId, userId } });
  }

  async getTotalUserContribution(userId: number): Promise<number> {
    // Calculate the total contribution amount made by a specific user
    const contributions = await this.prisma.contribution.findMany({
      where: { userId },
    });
    return contributions.reduce(
      (total, contribution) => total + contribution.amount,
      0,
    );
  }

  async getTotalUserContributionInGroup(
    userId: number,
    groupId: number,
  ): Promise<number> {
    // Calculate the total contribution amount made by a specific user in a specific group
    const contributions = await this.prisma.contribution.findMany({
      where: { userId, groupId },
    });
    return contributions.reduce(
      (total, contribution) => total + contribution.amount,
      0,
    );
  }

  async canUserContribute(userId: number, groupId: number): Promise<boolean> {
    // Add logic to check whether a user can contribute to a specific group
    // Example: Check if the user is already a member of the group and hasn't reached the contribution limit
    const user = await this.prisma.user.findUnique({ where: { pk: userId } });
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!user || !group) {
      throw new NotFoundException(`User or Group not found`);
    }

    const userGroup = await this.prisma.group.findFirst({
      where: { id: groupId, members: { some: { pk: userId } } },
    });

    return !!userGroup && group.size > 10; //userGroup.members.length;
  }
}

// export class ContributionDto {
//   readonly amount: number;
//   readonly userId: number;
//   readonly groupId: number;
// }
