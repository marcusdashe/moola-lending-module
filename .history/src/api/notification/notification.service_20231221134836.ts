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

  async updateNotification(
    notificationId: number,
    updates: Partial<Notification>,
  ): Promise<Notification> {
    const existingNotification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!existingNotification) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: updates,
    });
  }
}

export class CreateNotificationDto {
  readonly type: NotificationType;
  readonly userId: number;
  readonly groupId?: number;
  readonly sentAt: Date;
}
