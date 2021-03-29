import { PostgresDatabase } from '../../common/databases/postgres.database'
import { ProdutoRepository } from './produto.repository'
import { Produto } from '../../models/produto/produto.entity'

describe('Produto repossitory', () => {
  let functionsRepo = {}
  const mockRepo = jest.fn(() => functionsRepo)
  const mockConnection = jest.fn(() => {
    return {
      getRepository: mockRepo,
    }
  })
  const mockPostgresDatabase = {
    getConnection: mockConnection,
  }
  beforeEach(() => {
    jest
      .spyOn(PostgresDatabase, 'Instance', 'get')
      .mockReturnValue(mockPostgresDatabase as any)
  })
  it('should do create', async () => {
    const dtoSend = {
      nome: 'Calça Jeans',
      descricao: 'Calça boa',
      valorBase: 100,
      codigo: 'CAS-MALOK',
      variacoes: [
        {
          descricao: 'Tamanho',
          alternativas: [
            {
              nome: '44',
              codigo: '44',
              quantidade: 5,
              valor: 20,
            },
            {
              nome: '46',
              codigo: '46',
              quantidade: 10,
              valor: 40,
            },
          ],
        },
      ],
    }
    const shouldReturn = {
      id: 3,
      codigo: 'CAS-MALOK',
      nome: 'Calça Jeans',
      valorBase: 100,
      descricao: 'Calça boa',
      variacoes: [
        {
          id: 3,
          descricao: 'Tamanho',
          alternativas: [
            {
              id: 5,
              codigo: '44',
              nome: '44',
              valor: 20,
              quantidade: 5,
            },
            {
              id: 6,
              codigo: '46',
              nome: '46',
              valor: 40,
              quantidade: 10,
            },
          ],
        },
      ],
    }
    functionsRepo = {
      save: jest.fn(() => Promise.resolve(shouldReturn)),
    }
    const produtoRepository = new ProdutoRepository()
    await expect(produtoRepository.create(dtoSend)).resolves.toStrictEqual(
      shouldReturn,
    )
  })

  it('should do update', async () => {
    const dtoSend = {
      id: 2,
      codigo: 'CAS-MALOK',
      nome: 'Calça Jeans',
      valorBase: 100,
      descricao: 'Calça boa',
      variacoes: [
        {
          id: 2,
          descricao: 'Tamanho',
          alternativas: [
            {
              id: 3,
              codigo: '44',
              nome: '44',
              valor: 20,
              quantidade: 5,
            },
            {
              id: 4,
              codigo: '46',
              nome: '46',
              valor: 40,
              quantidade: 10,
            },
          ],
        },
      ],
    }
    const shouldReturn = {
      id: 2,
      codigo: 'CAS-MALOK',
      nome: 'Calça Jeans',
      valorBase: 100,
      descricao: 'Calça boa',
      variacoes: [
        {
          id: 2,
          descricao: 'Tamanho',
          alternativas: [
            {
              id: 3,
              codigo: '44',
              nome: '44',
              valor: 20,
              quantidade: 5,
            },
            {
              id: 4,
              codigo: '46',
              nome: '46',
              valor: 40,
              quantidade: 10,
            },
          ],
        },
      ],
    }
    const mockMasterManager = {
      delete: jest.fn(),
      save: jest.fn(() => Promise.resolve(shouldReturn)),
    }
    const mockQueryRunner = jest.fn(() => {
      return {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        manager: mockMasterManager,
        commitTransaction: jest.fn(),
        release: jest.fn(),
        rollbackTransaction: jest.fn(),
      }
    })
    const mockNewConnection = {
      createQueryRunner: mockQueryRunner,
    }
    const mockManager = {
      connection: mockNewConnection,
    }
    functionsRepo = {
      manager: mockManager,
    }
    const produtoRepository = new ProdutoRepository()
    await expect(
      produtoRepository.updateProduto(dtoSend as Produto, dtoSend as Produto),
    ).resolves.toStrictEqual(shouldReturn)
  })

  it('should do getByIdWithAllInformation', async () => {
    const shouldReturn = {
      id: 2,
      nome: 'Calça Jeans',
      valorBase: 100,
      descricao: 'Calça boa',
      codigo: 'CAS-MALOK',
      variacoes: [
        {
          id: 2,
          descricao: 'Tamanho',
          alternativas: [
            {
              id: 3,
              nome: '44',
              valor: 20,
              quantidade: 5,
              codigo: '44',
            },
            {
              id: 4,
              nome: '46',
              valor: 40,
              quantidade: 10,
              codigo: '46',
            },
          ],
        },
      ],
    }
    functionsRepo = {
      findOne: jest.fn(() => Promise.resolve(shouldReturn)),
    }
    const produtoRepository = new ProdutoRepository()
    await expect(
      produtoRepository.getByIdWithAllInformation(1),
    ).resolves.toStrictEqual(shouldReturn)
  })

  it('should do deleteById', async () => {
    functionsRepo = {
      delete: jest.fn(() => Promise.resolve({ affected: 1 })),
    }
    const produtoRepository = new ProdutoRepository()
    await expect(produtoRepository.delete(1))
  })

  it('should do getAll', async () => {
    const shouldReturn = [
      {
        id: 2,
        nome: 'Calça Jeans',
        valorBase: 100,
        descricao: 'Calça boa',
        codigo: 'CAS-MALOK',
      },
      {
        id: 3,
        nome: 'Calça Jeans',
        valorBase: 100,
        descricao: 'Calça boa',
        codigo: 'CAS-MALOK',
      },
    ]
    functionsRepo = {
      find: jest.fn(() => Promise.resolve(shouldReturn)),
    }
    const produtoRepository = new ProdutoRepository()
    await expect(produtoRepository.getAll()).resolves.toStrictEqual(
      shouldReturn,
    )
  })
})
