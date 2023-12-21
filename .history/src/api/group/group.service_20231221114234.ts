import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }

  async getGroupById(groupId: number): Promise<Group | null> {
    return this.prisma.group.findUnique({ where: { id: groupId } });
  }

  async createGroup(
    name: string,
    size: number,
    leaderId: number,
  ): Promise<Group> {
    if (size < 2) {
      throw new BadRequestException('Invalid group size');
    }
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

    if (updates.size && updates.size !== existingGroup.size) {
      throw new BadRequestException('Cannot update group size');
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
