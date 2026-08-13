import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewThreadService } from './review-thread.service';

@Controller('review-thread')
export class ReviewThreadController {
  constructor(private readonly reviewThreadService: ReviewThreadService) {}

  @Get('asset/:assetId')
  async getByAssetId(@Param('assetId') assetId: string) {
    return this.reviewThreadService.getByAssetId(assetId);
  }

  @Post()
  async addMessage(@Body() messageDto: any) {
    return this.reviewThreadService.addMessage(messageDto);
  }

  @Put(':id')
  async updateMessage(@Param('id') id: string, @Body() updateDto: any) {
    return this.reviewThreadService.updateMessage(id, updateDto);
  }

  @Delete(':id')
  async removeMessage(@Param('id') id: string) {
    return this.reviewThreadService.removeMessage(id);
  }
}
