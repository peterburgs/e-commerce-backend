import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Transaction, TransactionRelations, TransactionProduct} from '../models';
import {TransactionProductRepository} from './transaction-product.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id,
  TransactionRelations
> {

  public readonly transactionProducts: HasManyRepositoryFactory<TransactionProduct, typeof Transaction.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TransactionProductRepository') protected transactionProductRepositoryGetter: Getter<TransactionProductRepository>,
  ) {
    super(Transaction, dataSource);
    this.transactionProducts = this.createHasManyRepositoryFactoryFor('transactionProducts', transactionProductRepositoryGetter,);
    this.registerInclusionResolver('transactionProducts', this.transactionProducts.inclusionResolver);
  }
}
