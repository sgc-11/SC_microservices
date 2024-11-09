import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateOrderDto } from "src/orders/dtos/CreateOrder.dto";
import { PartialType } from "@nestjs/mapped-types";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    eventName: string;
    @IsNotEmpty()
    @IsDate()
    eventDate: Date;
    @IsNotEmpty()
    @IsString()
    guestName: string;
    @IsNotEmpty()
    @IsEmail()
    guestEmail: string;
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    guestCount: number;
    @IsString()
    @IsOptional()
    specialRequests?: string;

    @IsOptional()
    orders?: CreateOrderDto[];
}
export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

