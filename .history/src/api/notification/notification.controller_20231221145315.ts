import { Controller } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateNotificationDto,
  NotificationService,
} from './notification.service';
import { Notification } from '@prisma/client';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationService.getAllNotifications();
  }

  @Get(':id')
  async getNotificationById(
    @Param('id', ParseIntPipe) notificationId: number,
  ): Promise<Notification> {
    return this.notificationService.getNotificationById(notificationId);
  }

  @Post()
  async createNotification(
    @Body() notificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationService.createNotification(notificationDto);
  }

  @Put(':id')
  async updateNotification(
    @Param('id', ParseIntPipe) notificationId: number,
    @Body() updates: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationService.updateNotification(notificationId, updates);
  }

  @Delete(':id')
  async deleteNotification(
    @Param('id', ParseIntPipe) notificationId: number,
  ): Promise<void> {
    return this.notificationService.deleteNotification(notificationId);
  }

  @Get('user/:userId')
  async getNotificationsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getNotificationsByUser(userId);
  }

  @Get('unread/user/:userId')
  async getUnreadNotificationsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Notification[]> {
    return this.notificationService.getUnreadNotificationsByUser(userId);
  }

  @Put('mark-read/:id')
  async markNotificationAsRead(
    @Param('id', ParseIntPipe) notificationId: number,
  ): Promise<Notification> {
    return this.notificationService.markNotificationAsRead(notificationId);
  }
}
