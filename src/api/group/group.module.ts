import { Global, Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

Global();
@Module({
  providers: [GroupService],
  exports: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
