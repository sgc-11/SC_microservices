import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookingDto } from './dtos/CreateBooking.dto';

@Injectable()
export class BookingsMicroService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
        @Inject('NATS_SERVICE')
        private natsClient: ClientProxy
    ) {}

    async create(createBookingDto: CreateBookingDto) {
        const booking = this.bookingsRepository.create(createBookingDto);
        return this.bookingsRepository.save(booking);
    }

    async findAll() {
        return this.bookingsRepository.find({
            relations: ['orders']
        });
    }

    async findOne(id: number) {
        return this.bookingsRepository.findOne({
            where: { id },
            relations: ['orders']
        });
    }

    async update(id: number, updateBookingDto: Partial<CreateBookingDto>) {
        await this.bookingsRepository.update(id, updateBookingDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const booking = await this.findOne(id);
        return this.bookingsRepository.remove(booking);
    }

}
