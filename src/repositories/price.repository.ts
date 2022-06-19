import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Price, PriceRelations} from '../models';

export class PriceRepository extends DefaultCrudRepository<
  Price,
  typeof Price.prototype.id,
  PriceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Price, dataSource);
  }
}
