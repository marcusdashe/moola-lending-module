/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsEnum(NotificationType)
  type: NotificationType = NotificationType.DEFAULT_NOTICE;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRead: boolean = false;
}
