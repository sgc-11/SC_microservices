import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/CreateProduct.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @MessagePattern({ cmd: 'createProduct'})
    createProduct(@Payload() data: CreateProductDto) {
        console.log('Message pattern of createProduct received')
        return this.productsService.createProduct(data);
    }

    @MessagePattern({ cmd: 'retrieveProducts' })
    async getProducts() {
        const products = await this.productsService.getProducts();
        if(products.length ===0)
            return {message: 'There are no products'};
        
        return products;
    }
}
