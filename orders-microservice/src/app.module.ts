import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Booking } from './entities/booking.entity';
import { Product } from './entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'testuser',
    password: 'testuser123',
    database: 'orders_db',
    entities: [Order, Booking, Product],
    synchronize:true,
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
