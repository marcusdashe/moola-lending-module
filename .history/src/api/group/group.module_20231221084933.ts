import { Global, Module } from '@nestjs/common';

Global();
@Module({
  providers: [GroupService],
})
export class GroupModule {}
