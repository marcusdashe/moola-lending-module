import { GroupService } from './../../group/group.service';
import { Global, Module } from '@nestjs/common';

Global();
@Module({
  providers: [GroupService],
  exports: [GroupService],
  controllers: [],
})
export class GroupModule {}
