import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';
import { Booking } from 'src/entities/booking.entity';

@Module({
  imports: [
    NatsClientModule,
  TypeOrmModule.forFeature([Product, Order, Booking])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
