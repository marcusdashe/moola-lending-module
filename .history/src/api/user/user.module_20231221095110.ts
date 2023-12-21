import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
