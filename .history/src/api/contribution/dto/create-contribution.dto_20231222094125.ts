import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContributionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  groupId: number;
}
