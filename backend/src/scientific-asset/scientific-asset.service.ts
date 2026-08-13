import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Injectable()
export class ScientificAssetService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .select('*, AssetSource(*)');
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .select('*, AssetSource(*)')
      .eq('id', id)
      .single();
    if (error) throw new NotFoundException(error.message);
    return data;
  }

  async create(createDto: any) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .insert(createDto)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async update(id: string, updateDto: any) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .update(updateDto)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .delete()
      .eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }

  async addSource(assetId: string, sourceDto: any) {
    // Check if asset already has 3 sources
    const { data: sources, error: countError } = await this.supabaseService.getClient()
      .from('AssetSource')
      .select('id')
      .eq('asset_id', assetId);

    if (countError) throw new BadRequestException(countError.message);
    if (sources && sources.length >= 3) {
      throw new BadRequestException('An asset can have a maximum of 3 sources.');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('AssetSource')
      .insert({ ...sourceDto, asset_id: assetId })
      .select()
      .single();
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async removeSource(assetId: string, sourceId: string) {
    const { error } = await this.supabaseService.getClient()
      .from('AssetSource')
      .delete()
      .eq('id', sourceId)
      .eq('asset_id', assetId);
    if (error) throw new BadRequestException(error.message);
    return { success: true };
  }

  async approve(id: string, reviewerId: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('ScientificAsset')
      .update({ status: 'approved', reviewer_id: reviewerId })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);

    const targetUserId = data?.user_id || data?.author_id || data?.created_by;
    if (targetUserId) {
      this.pushNotificationsService.sendNotification(targetUserId, {
        title: 'Asset Approved',
        body: 'Your scientific asset has been approved.',
      }).catch(err => {
        console.error('Failed to send push notification for asset approval:', err);
      });
    }

    return data;
  }
}
