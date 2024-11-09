import { Controller, Inject, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookingDto } from './dtos/CreateBooking.dto';
import { firstValueFrom } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

@Controller('booking')
export class BookingController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    async create(@Body() createBookingDto: CreateBookingDto) {
        // First check stock availability if there are drink orders
        if (createBookingDto.orders?.length) {
            for (const order of createBookingDto.orders) {
                const hasStock = await firstValueFrom(
                    this.natsClient.send({ cmd: 'checkAvailability' }, {
                        liquorType: order.liquorType,
                        quantity: order.quantity
                    })
                );
                
                if (!hasStock) {
                    throw new BadRequestException(`Insufficient stock for ${order.liquorType}`);
                }
            }
        }

        // Create booking
        const booking = await firstValueFrom(
            this.natsClient.send({ cmd: 'createBooking' }, createBookingDto)
        );

        // Create associated orders if any
        if (createBookingDto.orders?.length) {
            for (const order of createBookingDto.orders) {
                await firstValueFrom(
                    this.natsClient.send({ cmd: 'createOrder' }, {
                        ...order,
                        eventServed: booking.id
                    })
                );
            }
        }

        return booking;
    }

    @Get()
    findAll() {
        return firstValueFrom(
            this.natsClient.send({ cmd: 'findAllBookings' }, {})
        );
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return firstValueFrom(
            this.natsClient.send({ cmd: 'findOneBooking' }, id)
        );
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookingDto: Partial<CreateBookingDto>) {
        return firstValueFrom(
            this.natsClient.send(
                { cmd: 'updateBooking' },
                { id, updateBookingDto }
            )
        );
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return firstValueFrom(
            this.natsClient.send({ cmd: 'removeBooking' }, id)
        );
    }
}
