import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CartItem, CartItemRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class CartItemRepository extends DefaultCrudRepository<
  CartItem,
  typeof CartItem.prototype.id,
  CartItemRelations
> {

  public readonly product: HasOneRepositoryFactory<Product, typeof CartItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(CartItem, dataSource);
    this.product = this.createHasOneRepositoryFactoryFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
