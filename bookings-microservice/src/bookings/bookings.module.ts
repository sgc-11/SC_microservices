import { Module } from '@nestjs/common';
import { BookingsMicroService } from './bookings.service';
import { BookingsMicroserviceController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Order } from 'src/entities/order.entity';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Order, Product]),
NatsClientModule],
  providers: [BookingsMicroService],
  controllers: [BookingsMicroserviceController]
})
export class BookingsModule {}
