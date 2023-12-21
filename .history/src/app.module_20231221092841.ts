import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { LoanService } from './api/loan/loan.service';
import { ContributionService } from './api/contribution/contribution.service';
import { LoanCycleService } from './api/loan-cycle/loan-cycle.service';
import { IssueService } from './api/issue/issue.service';
import { NotificationService } from './api/notification/notification.service';
import { NotificationModule } from './api/notification/notification.module';
import { LoanCycleModule } from './api/loan-cycle/loan-cycle.module';
import { LoanModule } from './api/loan/loan.module';
import { IssueModule } from './api/issue/issue.module';
import { GroupModule } from './api/group/group.module';
import { ContributionModule } from './api/contribution/contribution.module';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    PrismaModule,
    NotificationModule,
    LoanCycleModule,
    LoanModule,
    IssueModule,
    GroupModule,
    ContributionModule,
    UserModule,
  ],
  controllers: [GroupController],
  providers: [
    PrismaService,
    GroupService,
    UserService,
    LoanService,
    ContributionService,
    LoanCycleService,
    IssueService,
    NotificationService,
  ],
})
export class AppModule {}
