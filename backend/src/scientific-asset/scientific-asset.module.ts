import { Module } from '@nestjs/common';
import { ScientificAssetController } from './scientific-asset.controller';
import { ScientificAssetService } from './scientific-asset.service';
import { PushNotificationsModule } from '../push-notifications/push-notifications.module';

@Module({
  imports: [PushNotificationsModule],
  controllers: [ScientificAssetController],
  providers: [ScientificAssetService],
})
export class ScientificAssetModule {}
