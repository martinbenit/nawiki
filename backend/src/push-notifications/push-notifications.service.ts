import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';
import * as webPush from 'web-push';

@Injectable()
export class PushNotificationsService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private supabaseService: SupabaseService,
  ) {}

  onModuleInit() {
    const vapidPublicKey = this.configService.get<string>('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = this.configService.get<string>('VAPID_PRIVATE_KEY');
    const vapidSubject = this.configService.get<string>('VAPID_SUBJECT') || 'mailto:admin@nawiki.com';

    if (vapidPublicKey && vapidPrivateKey) {
      webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
    } else {
      console.warn('VAPID keys are missing. Web Push notifications will not work.');
    }
  }

  async saveSubscription(userId: string, subscription: any) {
    const { data, error } = await this.supabaseService.getClient()
      .from('PushSubscription')
      .upsert({ user_id: userId, subscription })
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async sendNotification(userId: string, payload: any) {
    const { data: subscriptions, error } = await this.supabaseService.getClient()
      .from('PushSubscription')
      .select('subscription')
      .eq('user_id', userId);

    if (error) throw new BadRequestException(error.message);

    const promises = subscriptions.map(sub => 
      webPush.sendNotification(sub.subscription, JSON.stringify(payload)).catch(e => {
        console.error('Error sending push notification', e);
        // Could handle invalid subscriptions here (e.g. remove them)
      })
    );

    await Promise.all(promises);
    return { success: true };
  }
}
