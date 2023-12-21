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
import { NotificationService } from './notification.service';
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
}
