import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '@prisma/client';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups(): Promise<Group[]> {
    return this.groupService.getAllGroups();
  }

  @Get(':id')
  async getGroupById(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<Group | null> {
    return this.groupService.getGroupById(groupId);
  }

  @Post()
  async createGroup(
    @Body('name') name: string,
    @Body('size', ParseIntPipe) size: number,
    @Body('leaderId', ParseIntPipe) leaderId: number,
  ): Promise<Group> {
    return this.groupService.createGroup(name, size, leaderId);
  }

  @Put(':id')
  async updateGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @Body() updates: Partial<Group>,
  ): Promise<Group> {
    return this.groupService.updateGroup(groupId, updates);
  }

  @Delete(':id')
  async deleteGroup(@Param('id', ParseIntPipe) groupId: number): Promise<void> {
    return this.groupService.deleteGroup(groupId);
  }
}
