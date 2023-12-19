import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto) {}

  async contributeToGroup(groupId: number, contributeDto: ContributeDto) {}

  async lendToMember(groupId: number, lendDto: LendDto) {}
}
