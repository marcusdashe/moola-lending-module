import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async getAllContributions(): Promise<Contribution[]> {
    return this.prisma.contribution.findMany();
  }
  async getContributionById(contributionId: number) {
    return this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });
  }
}
