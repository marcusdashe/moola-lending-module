import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getGroupById(groupId: number) {
    return this.prisma.group.findUnique({ where: { id: groupId } });
  }
}
