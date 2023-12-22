/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateLoanCycleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  recipientId: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCurrent: boolean = true;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  startDate: Date = new Date();

  @ApiProperty()
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean = false;
}
