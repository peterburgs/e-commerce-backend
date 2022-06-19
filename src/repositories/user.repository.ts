import {inject, Getter} from "@loopback/core";
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {User, UserRelations, Address, Transaction, Cart} from "../models";
import {AddressRepository} from "./address.repository";
import {TransactionRepository} from "./transaction.repository";
import {CartRepository} from "./cart.repository";

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly addresses: HasManyRepositoryFactory<
    Address,
    typeof User.prototype.id
  >;

  public readonly transactions: HasManyRepositoryFactory<
    Transaction,
    typeof User.prototype.id
  >;

  public readonly cart: HasOneRepositoryFactory<Cart, typeof User.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("AddressRepository")
    protected addressRepositoryGetter: Getter<AddressRepository>,
    @repository.getter("TransactionRepository")
    protected transactionRepositoryGetter: Getter<TransactionRepository>,
    @repository.getter("CartRepository")
    protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(User, dataSource);
    this.cart = this.createHasOneRepositoryFactoryFor(
      "cart",
      cartRepositoryGetter,
    );
    this.registerInclusionResolver("cart", this.cart.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor(
      "transactions",
      transactionRepositoryGetter,
    );
    this.registerInclusionResolver(
      "transactions",
      this.transactions.inclusionResolver,
    );
    this.addresses = this.createHasManyRepositoryFactoryFor(
      "addresses",
      addressRepositoryGetter,
    );
    this.registerInclusionResolver(
      "addresses",
      this.addresses.inclusionResolver,
    );
  }
}
