import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [OrdersController, ProductsController]
})
export class OrdersModule {}
