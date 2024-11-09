import { Module } from '@nestjs/common';
import { OrdersMicroserviceController } from './orders.controller';
import { OrdersMicroService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Booking } from 'src/entities/booking.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Booking, Product]),
    NatsClientModule],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersMicroService]
})
export class OrdersModule {}
