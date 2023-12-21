import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  public async create(data: Prisma.UserCreateInput) {
    return this.userRepository.create({ data });
  }

  public async update(params: Prisma.UserUpdateArgs) {
    return this.userRepository.update(params);
  }

  public async find(where: Prisma.UserWhereInput) {
    return this.userRepository.find({ where });
  }
}
