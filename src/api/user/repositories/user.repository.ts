/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true;
  };
}>;

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public includeRequired(query: any) {
    // must include profile
    if (!query.include) {
      query.include = { profile: true };
    }

    if (!query.include.profile) {
      query.include.profile = true;
    }

    return query;
  }

  public async create(query: Prisma.UserCreateArgs): Promise<UserWithProfile> {
    return this.prismaService.user.create(this.includeRequired(query)) as any;
  }

  public async find(
    query: Prisma.UserFindFirstArgs,
    profile = true,
  ): Promise<UserWithProfile | User> {
    if (profile) {
      return this.prismaService.user.findFirst(
        this.includeRequired(query),
      ) as any;
    }
    return this.prismaService.user.findFirst(query);
  }

  public async findById(
    id: string,
    profile = true,
  ): Promise<UserWithProfile | User> {
    if (!profile) {
      return this.prismaService.user.findFirst({ where: { id } });
    }

    return this.prismaService.user.findFirst(
      this.includeRequired({ where: { id } }),
    ) as any;
  }

  public async update(
    query: Prisma.UserUpdateArgs,
    profile = true,
  ): Promise<UserWithProfile | User> {
    if (!profile) {
      return this.prismaService.user.update(query);
    }

    return this.prismaService.user.update(this.includeRequired(query)) as any;
  }

  public async delete(query: Prisma.UserDeleteArgs): Promise<User> {
    return this.prismaService.user.delete(query);
  }
}
