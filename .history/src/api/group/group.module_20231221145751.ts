// import { GroupService } from './../../group/group.service';
import { Global, Module } from '@nestjs/common';
import { GroupController } from './group.controller';

Global();
@Module({
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
