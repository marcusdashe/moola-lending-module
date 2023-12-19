import { Controller } from '@nestjs/common';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
}
