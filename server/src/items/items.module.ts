import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { Items } from './providers/items';
import { ItemsController } from './items.controller';

@Module({
  providers: [ItemsService, Items],
  controllers: [ItemsController]
})
export class ItemsModule {}
