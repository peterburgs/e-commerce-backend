import {Entity, model, property, hasMany} from '@loopback/repository';
import {Price} from './price.model';

@model()
export class Product extends Entity {
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
  name: string;

  @property({
    type: "number",
    required: true,
  })
  stock: number;

  @property({
    type: "array",
    itemType: "string",
  })
  price?: string[];

  @property({
    type: "date",
  })
  createdAt?: string;

  @property({
    type: "date",
  })
  updatedAt?: string;

  @property({
    type: "string",
  })
  description?: string;

  @property({
    type: "string",
  })
  provider?: string;

  @property({
    type: "string",
  })
  code?: string;

  @property({
    type: "boolean",
    default: false,
  })
  isPublished?: boolean;

  @property({
    type: "string",
  })
  cartItemId?: string;

  @property({
    type: "string",
  })
  agency?: string;

  @hasMany(() => Price)
  prices: Price[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
