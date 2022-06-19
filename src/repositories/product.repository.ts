import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Product, ProductRelations, Price} from '../models';
import {PriceRepository} from './price.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly prices: HasManyRepositoryFactory<Price, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PriceRepository') protected priceRepositoryGetter: Getter<PriceRepository>,
  ) {
    super(Product, dataSource);
    this.prices = this.createHasManyRepositoryFactoryFor('prices', priceRepositoryGetter,);
    this.registerInclusionResolver('prices', this.prices.inclusionResolver);
  }
}
