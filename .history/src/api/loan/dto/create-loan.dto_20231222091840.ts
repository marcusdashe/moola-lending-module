/* eslint-disable prettier/prettier */
import { LoanStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsNumber()
  borrowerId: number;

  @IsOptional()
  @IsNumber()
  repaidAmount: number = 0;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @IsNotEmpty()
  @IsEnum(LoanStatus)
  status: LoanStatus;
}
