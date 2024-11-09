import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersMicroserviceController {
    constructor (@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

}
