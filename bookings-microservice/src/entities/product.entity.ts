import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    liquorType: string;

    @Column()
    stockLevel: number;

    @Column()
    supplierContact: string;

    @Column()
    reorderThreshold: number;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];
}