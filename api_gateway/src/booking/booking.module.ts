import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [BookingController]
})
export class BookingModule {}
