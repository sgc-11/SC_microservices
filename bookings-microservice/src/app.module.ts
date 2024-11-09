import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "/usr/src/app/src/bookings_db.sqlite",
      entities: [Booking, Order, Product],
      synchronize: true,
    }),
    BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
