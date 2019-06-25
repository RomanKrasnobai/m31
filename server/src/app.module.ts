import { Module, MiddlewareConsumer } from '@nestjs/common';
import { Routes, RouterModule, Route } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './api/items/items.module';
import { OrdersModule } from './api/orders/orders.module';
import { AdminFrontendMiddleware } from './admin.frontend.middleware';
import { EShopFrontendMiddleware } from './e-shop.frontend.middleware';
import { NovaPoshtaModule } from './nova-poshta/nova-poshta.module';
import { FirebaseModule } from './firebase/firebase.module';


const modules = [
  ItemsModule,
  OrdersModule,
  NovaPoshtaModule,
];

const routes: Routes = modules.map(module => ({
  path: 'api',
  module,
}) as Route);

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ...modules,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminFrontendMiddleware)
      .forRoutes('admin');
    consumer
      .apply(EShopFrontendMiddleware)
      .forRoutes('');
  }
}
