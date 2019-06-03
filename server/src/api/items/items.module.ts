import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { Items } from './providers/items';
import { ItemsController } from './items.controller';
import { FirebaseModule } from '../../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [ItemsService, Items],
  controllers: [ItemsController],
})
export class ItemsModule {}
