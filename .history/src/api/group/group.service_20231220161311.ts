import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }

  async getGroupById(groupId: number) {
    return this.prisma.group.findUnique({ where: { id: groupId } });
  }

  async createGroup(
    name: string,
    size: number,
    leaderId: number,
  ): Promise<Group> {
    return this.prisma.group.create({
      data: {
        name,
        size,
        leaderId,
      },
    });
  }

  async updateGroup(groupId: number, updates: Partial<Group>): Promise<Group> {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!existingGroup) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return this.prisma.group.update({
      where: { id: groupId },
      data: updates,
    });
  }

  async deleteGroup(groupId: number): Promise<void> {
    const existingGroup = await this.prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!existingGroup) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    await this.prisma.group.delete({ where: { id: groupId } });
  }
}
