import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TransactionProduct, TransactionProductRelations} from '../models';

export class TransactionProductRepository extends DefaultCrudRepository<
  TransactionProduct,
  typeof TransactionProduct.prototype.id,
  TransactionProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TransactionProduct, dataSource);
  }
}
