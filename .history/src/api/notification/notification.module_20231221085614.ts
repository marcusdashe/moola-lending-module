import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Global()
@Module({
  imports: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
