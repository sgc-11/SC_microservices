import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    liquorType: string;
    @IsNumber()
    @IsPositive()
    stockLevel: number;
    @IsString()
    @IsNotEmpty()
    supplierContact: string;
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    reorderThreshold: number;
}