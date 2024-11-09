import { Body, Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookingsMicroService } from './bookings.service';
import { CreateBookingDto } from './dtos/CreateBooking.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';

@Controller('bookings')
export class BookingsMicroserviceController {
    constructor (
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private readonly bookingsService: BookingsMicroService) {}    


    @MessagePattern({ cmd: 'createBooking' })
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }

    @MessagePattern({ cmd: 'findAllBookings' })
    findAll() {
        return this.bookingsService.findAll();
    }

    @MessagePattern({ cmd: 'findOneBooking' })
    findOne(@Payload() id: number) {
        return this.bookingsService.findOne(id);
    }

    @MessagePattern({ cmd: 'updateBooking' })
    update(@Payload() payload: { id: number; updateBookingDto: Partial<CreateBookingDto> }) {
        return this.bookingsService.update(payload.id, payload.updateBookingDto);
    }

    @MessagePattern({ cmd: 'removeBooking' })
    remove(@Payload() id: number) {
        return this.bookingsService.remove(id);
    }

}
