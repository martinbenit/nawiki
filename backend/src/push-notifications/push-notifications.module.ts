import { Module } from '@nestjs/common';
import { PushNotificationsController } from './push-notifications.controller';
import { PushNotificationsService } from './push-notifications.service';

@Module({
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService],
})
export class PushNotificationsModule {}
