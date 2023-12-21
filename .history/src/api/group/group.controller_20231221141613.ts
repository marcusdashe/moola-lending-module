import { Controller, Get } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '@prisma/client';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups(): Promise<Group[]> {
    return this.groupService.getAllGroups();
  }
}
