import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ScientificAssetService } from './scientific-asset.service';

@Controller('scientific-asset')
export class ScientificAssetController {
  constructor(private readonly scientificAssetService: ScientificAssetService) {}

  @Get()
  async findAll() {
    return this.scientificAssetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scientificAssetService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.scientificAssetService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.scientificAssetService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.scientificAssetService.remove(id);
  }

  @Post(':id/sources')
  async addSource(@Param('id') id: string, @Body() sourceDto: any) {
    return this.scientificAssetService.addSource(id, sourceDto);
  }

  @Delete(':id/sources/:sourceId')
  async removeSource(@Param('id') id: string, @Param('sourceId') sourceId: string) {
    return this.scientificAssetService.removeSource(id, sourceId);
  }
}
