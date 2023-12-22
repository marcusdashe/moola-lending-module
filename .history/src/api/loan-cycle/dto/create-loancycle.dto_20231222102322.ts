/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateLoanCycleDto {
  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @IsInt()
  recipientId: number;

  @IsOptional()
  @IsBoolean()
  isCurrent: boolean = true;

  @IsOptional()
  @IsDate()
  startDate: Date = new Date();

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean = false;
}
