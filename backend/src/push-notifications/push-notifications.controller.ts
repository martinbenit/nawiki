import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';

@Controller('push-notifications')
export class PushNotificationsController {
  constructor(private readonly pushService: PushNotificationsService) {}

  @Post('subscribe')
  async subscribe(@Body() subscriptionDto: { userId: string; subscription: any }) {
    return this.pushService.saveSubscription(subscriptionDto.userId, subscriptionDto.subscription);
  }

  @Post('send')
  async sendNotification(@Body() payloadDto: { userId: string; payload: any }) {
    return this.pushService.sendNotification(payloadDto.userId, payloadDto.payload);
  }
}
