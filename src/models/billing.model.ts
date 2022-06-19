import {Entity, model, property} from '@loopback/repository';

@model()
export class Billing extends Entity {
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
  user: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  fileUrl: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  transactionId?: string;

  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
