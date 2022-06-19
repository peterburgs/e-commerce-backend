import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
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
  country?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  province?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  commune?: string;

  @property({
    type: 'string',
  })
  ward?: string;

  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  apartmentNumber?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
