import {Entity, model, property, hasMany, hasOne} from "@loopback/repository";
import {UserType, Gender} from "../shared/types";
import {Address} from "./address.model";
import {Transaction} from "./transaction.model";
import {Cart} from "./cart.model";

@model()
export class User extends Entity {
  @property({
    type: "string",
    enum: [UserType.CUSTOMER, UserType.AGENCY, UserType.ADMIN],
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: "string",
    default: "New User",
    required: false,
  })
  fullName?: string;

  @property({
    type: "string",
    required: false,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: "boolean",
    default: false,
  })
  isEmailVerified: string;

  @property({
    type: "string",
  })
  hashedPassword: string;

  @property({
    type: "string",
    required: true,
  })
  phoneNumber: string;

  @property({
    type: "string",
    in: [Gender.FEMALE, Gender.MALE, Gender.OTHER],
  })
  gender?: string;

  @property({
    type: "string",
    required: true,
  })
  type: string;

  @property({
    type: "date",
  })
  createdAt?: string;

  @property({
    type: "date",
  })
  updatedAt?: string;

  @hasMany(() => Address)
  addresses: Address[];

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @hasOne(() => Cart)
  cart: Cart;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
