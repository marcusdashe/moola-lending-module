import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Contribution, Group, Loan, LoanCycle, User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';

@ApiTags('Group Endpoints')
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
  async createGroup(@Body() groupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(groupDto);
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

  @Get(':id/members')
  async getGroupsMembers(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<User[]> {
    return this.groupService.getGroupsMembers(groupId);
  }

  @Post(':id/add-member/:memberId')
  async addMemberToGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ): Promise<Group> {
    return this.groupService.addMemberToGroup(groupId, memberId);
  }

  @Delete(':id/remove-member/:memberId')
  async removeMemberFromGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ): Promise<Group> {
    return this.groupService.removememberFromGroup(groupId, memberId);
  }

  @Get(':id/is-full')
  async isGroupFull(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<boolean> {
    return this.groupService.isGroupFull(groupId);
  }

  @Get(':id/loans')
  async getGroupLoans(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<Loan[]> {
    return this.groupService.getGroupLoans(groupId);
  }

  @Get('user/:userId')
  async getUserGroup(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Group | null> {
    return this.groupService.getUserGroup(userId);
  }

  @Get(':id/contributions')
  async getGroupContributions(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<Contribution[]> {
    return this.groupService.getGroupContributions(groupId);
  }

  @Get(':id/loan-cycles')
  async getGroupLoanCycles(
    @Param('id', ParseIntPipe) groupId: number,
  ): Promise<LoanCycle[]> {
    return this.groupService.getGroupLoanCycles(groupId);
  }
}
