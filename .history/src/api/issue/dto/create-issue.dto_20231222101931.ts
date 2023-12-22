/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty({ description: 'The description of the issue' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The ID of the user that created the issue' })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'The Boolean indicating if the issue is been resolved or not',
  })
  @IsBoolean()
  isResolved: boolean = false;
}
