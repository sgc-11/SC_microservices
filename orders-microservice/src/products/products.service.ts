import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ) {}

    createProduct(createProductDto: CreateProductDto) {
        const newProduct = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(newProduct);
    }

    getProducts() {
        return this.productsRepository.find();
    }
}
