import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Injectable()
export class ReviewThreadService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly pushService: PushNotificationsService
  ) {}

  async getByAssetId(assetId: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ReviewThread')
      .select('*')
      .eq('asset_id', assetId)
      .order('created_at', { ascending: true });

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async addMessage(messageDto: any) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ReviewThread')
      .insert(messageDto)
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);

    // Optionally notify the asset owner (Alumno) or reviewer (Profesor) here
    // In a real scenario, you'd fetch the recipient's userId
    // await this.pushService.sendNotification(recipientUserId, { title: 'New Feedback', body: 'You have new feedback' });

    return data;
  }

  async updateMessage(id: string, updateDto: any) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ReviewThread')
      .update(updateDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async removeMessage(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('ReviewThread')
      .delete()
      .eq('id', id);

    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }
}
