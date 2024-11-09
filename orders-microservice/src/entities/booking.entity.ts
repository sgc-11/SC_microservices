import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity({name: 'bookings'})
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventName: string;

    @Column()
    eventDate: Date;

    @Column()
    guestName: string;

    @Column()
    guestEmail: string;

    @Column()
    guestCount: number;

    @Column()
    specialRequests: string;

    @OneToMany(() => Order, (order) => order.eventServed)
    orders: Order[];
}