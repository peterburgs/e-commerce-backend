import {Entity, model, property} from '@loopback/repository';

@model()
export class TransactionProduct extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  product: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    required: true,
  })
  transaction: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  transactionId?: string;

  constructor(data?: Partial<TransactionProduct>) {
    super(data);
  }
}

export interface TransactionProductRelations {
  // describe navigational properties here
}

export type TransactionProductWithRelations = TransactionProduct & TransactionProductRelations;
