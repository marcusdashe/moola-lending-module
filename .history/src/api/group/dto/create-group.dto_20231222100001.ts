/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { GroupStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  leaderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The status of the group',
    enum: GroupStatus,
    enumName: 'GroupStatus',
    example: [GroupStatus.ACTIVE, GroupStatus.DISSOLVED],
  })
  @IsNotEmpty()
  @IsEnum(GroupStatus)
  status: GroupStatus;
}
