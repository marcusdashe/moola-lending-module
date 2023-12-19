import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, ContributeDto, LendDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const { size, leaderId } = createGroupDto;
    const group = await this.prisma.group.create({
      data: {
        size,
        leaderId,
      },
    });
    return group;
  }

  async contributeToGroup(groupId: number, contributeDto: ContributeDto) {
    const { userId, amount } = contributeDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
  }

  async lendToMember(groupId: number, lendDto: LendDto) {}
}
