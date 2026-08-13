import { Module } from '@nestjs/common';
import { ScientificAssetController } from './scientific-asset.controller';
import { ScientificAssetService } from './scientific-asset.service';

@Module({
  controllers: [ScientificAssetController],
  providers: [ScientificAssetService],
})
export class ScientificAssetModule {}
