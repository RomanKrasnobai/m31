import { Module } from '@nestjs/common';

import { FirebaseModule } from './../../firebase/firebase.module';
import { OrdersService } from './services/orders.service';
import { Orders } from './providers/orders';
import { OrdersController } from './orders.controller';

@Module({
  imports: [FirebaseModule],
  providers: [OrdersService, Orders],
  controllers: [OrdersController],
})
export class OrdersModule {}
