import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  async getNotificationById(
    notificationId: number,
  ): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id: notificationId },
    });
  }

  async createNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { type, userId, groupId, sentAt } = notificationDto;

    return this.prisma.notification.create({
      data: {
        type,
        userId,
        groupId,
        sentAt,
      },
    });
  }
}

export class CreateNotificationDto {
  readonly type: NotificationType;
  readonly userId: number;
  readonly groupId?: number;
  readonly sentAt: Date;
}
