import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }
}

export class CreateNotificationDto {
  readonly type: NotificationType;
  readonly userId: number;
  readonly groupId?: number;
  readonly sentAt: Date;
}
