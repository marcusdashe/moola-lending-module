import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, ContributeDto, LendDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const { size, leaderId } = createGroupDto;
    // const group = await this.prisma.group.create({
    // data: {
    //   size,
    //   leaderId,
    // },
    // });
    // return group;
  }

  async contributeToGroup(groupId: number, contributeDto: ContributeDto) {
    const { userId, amount } = contributeDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const contribution = await this.prisma.contribution.create({
      data: {
        userId,
        groupId,
        amount,
      },
    });
    return contribution;
  }

  async lendToMember(groupId: number, lendDto: LendDto) {
    const { borrowerId, amount } = lendDto;

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    // const loan = await this.prisma.loan.create({
    //   data: {
    //     groupId,
    //     borrowerId,
    //     amount,
    //   },
    // });
    // return loan;
  }
}
