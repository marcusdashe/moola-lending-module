import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Post(':groupId/contribute')
  constributeToGroup(
    @Param('groupId') groupId: number,
    @Body() contributeDto: ContributeDto,
  ) {
    return this.groupService.contributeToGroup(groupId, contributeDto);
  }
    
    Post(':groupId/lend')
    lendToMember(@Param('groupId') groupId: number, @Body() lendDto: LendDto) {
        return this.groupService.lendToMember(groupId, lendDto)
    }
}
