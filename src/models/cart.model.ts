import {Entity, model, property, hasMany} from "@loopback/repository";
import {CartItem} from './cart-item.model';

@model()
export class Cart extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: "string",
    required: true,
  })
  user: string;

  @property({
    type: "date",
  })
  updatedAt?: string;

  @property({
    type: "array",
    itemType: "string",
  })
  items?: string[];

  @property({
    type: "string",
  })
  userId?: string;

  @hasMany(() => CartItem)
  cartItems: CartItem[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
