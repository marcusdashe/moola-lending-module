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
  @ApiProperty({ description: 'The name of the group' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The size of the group' })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({ description: 'The ID of the leader of the group' })
  @IsNotEmpty()
  @IsNumber()
  leaderId: number;

  @ApiProperty({ description: 'The creation date of the group' })
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
