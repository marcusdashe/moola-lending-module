import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly profileService: ProfileService,
    // private readonly configService: ConfigService,
  ) {}

  public async create(data: Prisma.UserCreateInput) {
    return this.userRepository.create({ data });
  }

  public async update(params: Prisma.UserUpdateArgs) {
    return this.userRepository.update(params);
  }

  public async find(where: Prisma.UserWhereInput) {
    return this.userRepository.find({ where });
  }
  public async getUserByEmail(email: string) {
    return this.userRepository.find({ where: { email } });
  }

  public async getUserByUsername(username: string) {
    return this.userRepository.find({ where: { profile: { username } } });
  }

  public async getUserByPhone(phone: string) {
    return this.userRepository.find({ where: { phone } });
  }

  //   public async getUserById(id: string) {
  //     return this.userRepository.findById(id);
  //   }

  public async deleteUserById(id: string) {
    return this.userRepository.delete({ where: { id } });
  }
}
