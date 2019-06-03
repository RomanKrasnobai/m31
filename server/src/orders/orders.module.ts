import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { Orders } from './providers/orders';
import { OrdersController } from './orders.controller';

@Module({
  providers: [OrdersService, Orders],
  controllers: [OrdersController]
})
export class OrdersModule {}
