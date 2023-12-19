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
  }

  async contributeToGroup(groupId: number, contributeDto: ContributeDto) {}

  async lendToMember(groupId: number, lendDto: LendDto) {}
}
