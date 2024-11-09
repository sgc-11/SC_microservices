import { Body, Controller, Inject, Post, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dtos/CreateProduct.dto';

@Controller('products')
export class ProductsController {
    constructor (@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        console.log(createProductDto);
        return this.natsClient.send({ cmd: 'createProduct'}, createProductDto);
    }

    @Get()
    getProducts() {
        console.log('retrieving all the liquor products')
        return this.natsClient.send({ cmd: 'retrieveProducts'}, {});
    }
}
