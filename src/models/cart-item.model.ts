import {Entity, model, property, hasOne} from "@loopback/repository";
import {Product} from "./product.model";

@model()
export class CartItem extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: "date",
  })
  createdAt?: string;

  @property({
    type: "number",
    default: 0,
  })
  stock?: number;

  @property({
    type: "string",
  })
  cartId?: string;

  @hasOne(() => Product)
  product: Product;

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
