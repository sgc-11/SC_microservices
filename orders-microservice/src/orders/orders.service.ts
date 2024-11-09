import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Booking } from 'src/entities/booking.entity';

@Injectable()
export class OrdersMicroService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @Inject('NATS_SERVICE')
        private natsClient: ClientProxy
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        const product = await this.productsRepository.findOneBy({
            liquorType: createOrderDto.liquorType
        });

        if (!product) {
            throw new NotFoundException(`Product ${createOrderDto.liquorType} not found`);
        }

        if (product.stockLevel < createOrderDto.quantity) {
            this.natsClient.emit('stock.warning', {
                liquorType: createOrderDto.liquorType,
                currentStock: product.stockLevel
            });
            throw new BadRequestException('Insufficient stock');
        }

        product.stockLevel -= createOrderDto.quantity;
        await this.productsRepository.save(product);

        const order = this.ordersRepository.create({
            quantity: createOrderDto.quantity,
            product: product,
            eventServed: createOrderDto.eventServed 
                ? { id: createOrderDto.eventServed } as Booking // Only if provided
                : undefined
        });
        

        if (product.stockLevel <= product.reorderThreshold) {
            this.natsClient.emit('stock.reorder', {
                liquorType: product.liquorType,
                currentStock: product.stockLevel
            });
        }

        return this.ordersRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({ relations: ['product', 'eventServed'] });
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['product', 'eventServed']
        });
        
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async update(id: number, updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
        const order = await this.findOne(id);

        if (updateOrderDto.quantity) {
            const product = await this.productsRepository.findOneBy({ id: order.product.id });
            
            if (!product) {
                throw new NotFoundException(`Product not found`);
            }

            const stockDifference = updateOrderDto.quantity - order.quantity;
            
            if (product.stockLevel < stockDifference) {
                throw new BadRequestException('Insufficient stock for updated quantity');
            }

            product.stockLevel -= stockDifference;
            await this.productsRepository.save(product);

            order.quantity = updateOrderDto.quantity;
        }

        if (updateOrderDto.eventServed) {
            order.eventServed = { id: updateOrderDto.eventServed } as any;
        }

        return this.ordersRepository.save(order);
    }

    async remove(id: number): Promise<void> {
        const order = await this.findOne(id);
        await this.ordersRepository.remove(order);
    }
}
