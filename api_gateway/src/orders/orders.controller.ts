import { Controller, Inject, Param, Delete, Post, Get, Body, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, UpdateOrderDto } from './dtos/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        console.log('Sending Create order to orders-microservice')
        return this.natsClient.send({ cmd: 'createOrder' }, createOrderDto);
    }

    @Get()
    findAll() {
        return this.natsClient.send({ cmd: 'findAllOrders' }, {});
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.natsClient.send({ cmd: 'findOneOrder' }, id);
    }

    @Get('stock/:liquorType')
    checkStock(@Param('liquorType') liquorType: string) {
        return this.natsClient.send({ cmd: 'checkStock' }, liquorType) ;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
        console.log(`Sending Update to order ${id} to orders-microservice`);
        return this.natsClient.send({ cmd: 'updateOrder' }, { id, ...updateOrderDto });
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        console.log(`Sending order to delete id ${id}`)
        return this.natsClient.send({ cmd: 'removeOrder' }, id);
    }

}
