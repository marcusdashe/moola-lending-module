import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';

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
    const { type, userId, groupId } = notificationDto;

    return this.prisma.notification.create({
      data: {
        type,
        userId,
        groupId,
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

  async deleteNotification(notificationId: number): Promise<void> {
    const existingNotification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!existingNotification) {
      throw new NotFoundException(
        `Notification with ID ${notificationId} not found`,
      );
    }

    await this.prisma.notification.delete({ where: { id: notificationId } });
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    // Retrieve all notifications for a specific user
    return this.prisma.notification.findMany({ where: { userId } });
  }

  async getUnreadNotificationsByUser(userId: number): Promise<Notification[]> {
    // Retrieve all unread notifications for a specific user
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
    });
  }

  async markNotificationAsRead(notificationId: number): Promise<Notification> {
    // Mark a specific notification as read
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}
