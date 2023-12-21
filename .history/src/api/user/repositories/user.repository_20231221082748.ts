import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true;
  };
}>;
