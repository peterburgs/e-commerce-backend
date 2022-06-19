import {Entity, model, property} from "@loopback/repository";

@model()
export class Price extends Entity {
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
    type: "date",
  })
  updatedAt?: string;

  @property({
    type: "number",
    required: true,
  })
  initialPrice: number;

  @property({
    type: "number",
    default: 0,
  })
  discountPercentage?: number;

  @property({
    type: "string",
  })
  description?: string;

  @property({
    type: "date",
    required: true,
  })
  validUntil: string;

  @property({
    type: "string",
  })
  productId?: string;

  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
