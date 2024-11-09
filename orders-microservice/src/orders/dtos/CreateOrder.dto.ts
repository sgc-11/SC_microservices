
export class CreateOrderDto {
    //validations are in gateway
  liquorType: string;
  quantity: number;
  eventServed?: number;
}
export class UpdateOrderDto extends CreateOrderDto {}