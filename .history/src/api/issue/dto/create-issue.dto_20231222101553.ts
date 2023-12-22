/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsBoolean()
  isResolved: boolean = false;
}
