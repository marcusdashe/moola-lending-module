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

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GroupStatus)
  status: GroupStatus;
}
