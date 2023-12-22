/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { LoanStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateLoanDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  borrowerId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  repaidAmount: number = 0;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(LoanStatus)
  status: LoanStatus;
}
