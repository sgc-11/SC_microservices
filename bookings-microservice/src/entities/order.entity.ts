import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Booking } from "./booking.entity";
import { Product } from "./product.entity";

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (Product) => Product.orders)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    quantity: number;

    @ManyToOne(() => Booking, (booking) => booking.orders, {nullable: true})
    @JoinColumn({ name: 'eventServed'})
    eventServed: Booking;
}