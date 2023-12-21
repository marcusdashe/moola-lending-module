import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [NotificationService],
})
export class NotificationModule {}
