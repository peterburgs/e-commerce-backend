import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CartItem,
  Product,
} from '../models';
import {CartItemRepository} from '../repositories';

export class CartItemProductController {
  constructor(
    @repository(CartItemRepository) protected cartItemRepository: CartItemRepository,
  ) { }

  @get('/cart-items/{id}/product', {
    responses: {
      '200': {
        description: 'CartItem has one Product',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product> {
    return this.cartItemRepository.product(id).get(filter);
  }

  @post('/cart-items/{id}/product', {
    responses: {
      '200': {
        description: 'CartItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CartItem.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInCartItem',
            exclude: ['id'],
            optional: ['cartItemId']
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.cartItemRepository.product(id).create(product);
  }

  @patch('/cart-items/{id}/product', {
    responses: {
      '200': {
        description: 'CartItem.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.cartItemRepository.product(id).patch(product, where);
  }

  @del('/cart-items/{id}/product', {
    responses: {
      '200': {
        description: 'CartItem.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.cartItemRepository.product(id).delete(where);
  }
}
