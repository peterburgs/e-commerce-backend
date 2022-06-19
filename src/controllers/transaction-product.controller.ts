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
  Transaction,
  TransactionProduct,
} from '../models';
import {TransactionRepository} from '../repositories';

export class TransactionTransactionProductController {
  constructor(
    @repository(TransactionRepository) protected transactionRepository: TransactionRepository,
  ) { }

  @get('/transactions/{id}/transaction-products', {
    responses: {
      '200': {
        description: 'Array of Transaction has many TransactionProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TransactionProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TransactionProduct>,
  ): Promise<TransactionProduct[]> {
    return this.transactionRepository.transactionProducts(id).find(filter);
  }

  @post('/transactions/{id}/transaction-products', {
    responses: {
      '200': {
        description: 'Transaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(TransactionProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Transaction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionProduct, {
            title: 'NewTransactionProductInTransaction',
            exclude: ['id'],
            optional: ['transactionId']
          }),
        },
      },
    }) transactionProduct: Omit<TransactionProduct, 'id'>,
  ): Promise<TransactionProduct> {
    return this.transactionRepository.transactionProducts(id).create(transactionProduct);
  }

  @patch('/transactions/{id}/transaction-products', {
    responses: {
      '200': {
        description: 'Transaction.TransactionProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionProduct, {partial: true}),
        },
      },
    })
    transactionProduct: Partial<TransactionProduct>,
    @param.query.object('where', getWhereSchemaFor(TransactionProduct)) where?: Where<TransactionProduct>,
  ): Promise<Count> {
    return this.transactionRepository.transactionProducts(id).patch(transactionProduct, where);
  }

  @del('/transactions/{id}/transaction-products', {
    responses: {
      '200': {
        description: 'Transaction.TransactionProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TransactionProduct)) where?: Where<TransactionProduct>,
  ): Promise<Count> {
    return this.transactionRepository.transactionProducts(id).delete(where);
  }
}
