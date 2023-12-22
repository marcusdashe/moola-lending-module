import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LoanCycleDto, LoanCycleService } from './loan-cycle.service';
import { LoanCycle, User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Loan Cycle Endpoints')
@Controller('loan-cycles')
export class LoanCycleController {
  constructor(private readonly loanCycleService: LoanCycleService) {}

  @Get()
  async getAllLoanCycles(): Promise<LoanCycle[]> {
    return this.loanCycleService.getAllLoanCycles();
  }

  @Get(':id')
  async getLoanCycleById(
    @Param('id', ParseIntPipe) loanCycleId: number,
  ): Promise<LoanCycle> {
    return this.loanCycleService.getLoanCycleById(loanCycleId);
  }

  @Post()
  async createLoanCycle(
    @Body() loanCycleDto: LoanCycleDto,
  ): Promise<LoanCycle> {
    return this.loanCycleService.createLoanCycle(
      loanCycleDto.groupId,
      loanCycleDto.recipientId,
    );
  }

  @Put(':id')
  async updateLoanCycle(
    @Param('id', ParseIntPipe) loanCycleId: number,
    @Body() updates: Partial<LoanCycle>,
  ): Promise<LoanCycle> {
    return this.loanCycleService.updateLoanCycle(loanCycleId, updates);
  }

  @Delete(':id')
  async deleteLoanCycle(
    @Param('id', ParseIntPipe) loanCycleId: number,
  ): Promise<void> {
    return this.loanCycleService.deleteLoanCycle(loanCycleId);
  }

  @Get('active/group/:groupId')
  async getActiveLoanCyclesByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<LoanCycle[]> {
    return this.loanCycleService.getActiveLoanCyclesByGroup(groupId);
  }

  @Get(':id/recipients')
  async getLoanCycleRecipients(
    @Param('id', ParseIntPipe) loanCycleId: number,
  ): Promise<User> {
    return this.loanCycleService.getLoanCycleRecipients(loanCycleId);
  }

  @Get('active/group/:groupId/recipient/:recipientId')
  async getActiveLoanCycleByGroupAndRecipient(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('recipientId', ParseIntPipe) recipientId: number,
  ): Promise<LoanCycle | null> {
    return this.loanCycleService.getActiveLoanCycleByGroupAndRecipient(
      groupId,
      recipientId,
    );
  }

  @Get('recipients/group/:groupId')
  async getLoanCycleRecipientsByGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<User[]> {
    return this.loanCycleService.getLoanCycleRecipientsByGroup(groupId);
  }

  @Get('can-create/:groupId/recipient/:recipientId')
  async canCreateLoanCycle(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('recipientId', ParseIntPipe) recipientId: number,
  ): Promise<boolean> {
    return this.loanCycleService.canCreateLoanCycle(groupId, recipientId);
  }
}
