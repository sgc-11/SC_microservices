import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [BookingModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
