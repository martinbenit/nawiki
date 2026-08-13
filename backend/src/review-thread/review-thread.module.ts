import { Module } from '@nestjs/common';
import { ReviewThreadController } from './review-thread.controller';
import { ReviewThreadService } from './review-thread.service';
import { PushNotificationsModule } from '../push-notifications/push-notifications.module';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Module({
  imports: [PushNotificationsModule], // If needed, although providers can be scoped
  controllers: [ReviewThreadController],
  providers: [ReviewThreadService, PushNotificationsService],
})
export class ReviewThreadModule {}
