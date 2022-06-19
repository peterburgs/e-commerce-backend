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
  Product,
  Price,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductPriceController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/prices', {
    responses: {
      '200': {
        description: 'Array of Product has many Price',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Price)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Price>,
  ): Promise<Price[]> {
    return this.productRepository.prices(id).find(filter);
  }

  @post('/products/{id}/prices', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Price)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {
            title: 'NewPriceInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) price: Omit<Price, 'id'>,
  ): Promise<Price> {
    return this.productRepository.prices(id).create(price);
  }

  @patch('/products/{id}/prices', {
    responses: {
      '200': {
        description: 'Product.Price PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Price, {partial: true}),
        },
      },
    })
    price: Partial<Price>,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.productRepository.prices(id).patch(price, where);
  }

  @del('/products/{id}/prices', {
    responses: {
      '200': {
        description: 'Product.Price DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Price)) where?: Where<Price>,
  ): Promise<Count> {
    return this.productRepository.prices(id).delete(where);
  }
}
