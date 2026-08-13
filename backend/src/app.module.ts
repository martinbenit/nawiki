import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ScientificAssetModule } from './scientific-asset/scientific-asset.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { ReviewThreadModule } from './review-thread/review-thread.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    ScientificAssetModule,
    PushNotificationsModule,
    ReviewThreadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
