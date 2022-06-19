import {Entity, model, property, hasMany} from "@loopback/repository";
import {TransactionStatus} from "../shared/types";
import {Billing} from './billing.model';
import {TransactionProduct} from './transaction-product.model';

@model()
export class Transaction extends Entity {
  @property({
    type: "string",
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: "string",
  })
  user: "string";

  @property({
    type: "date",
  })
  createdAt?: string;

  @property({
    type: "date",
  })
  executedAt?: string;

  @property({
    type: "string",
    default: TransactionStatus.INITIAL,
    in: [
      TransactionStatus.INITIAL,
      TransactionStatus.AUTHORIZATION_DECLINED,
      TransactionStatus.CANCELLED_BY_CUSTOMER,
      TransactionStatus.FAILED,
      TransactionStatus.INVALID,
      TransactionStatus.SUCCESS,
    ],
  })
  status?: string;

  @property({
    type: "string",
  })
  description?: string;

  @property({
    type: "string",
  })
  billing?: string;

  @property({
    type: "string",
  })
  userId?: string;

  @hasMany(() => Billing)
  billings: Billing[];

  @hasMany(() => TransactionProduct)
  transactionProducts: TransactionProduct[];

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
