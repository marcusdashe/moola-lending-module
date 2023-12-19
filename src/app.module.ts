import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, GroupController],
  providers: [AppService, PrismaService, GroupService, UserService],
})
export class AppModule {}
