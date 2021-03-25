import { Test, TestingModule } from '@nestjs/testing'
import { ProdutosService } from './produtos.service'
import { createMock } from '@golevelup/nestjs-testing'
import { Connection, EntityManager, QueryRunner, Repository } from 'typeorm'
import { Produto } from '../../models/produto/produto.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('ProdutosService', () => {
  let service: ProdutosService
  const repo = createMock<Repository<Produto>>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getRepositoryToken(Produto),
          useValue: repo,
        },
      ],
    }).compile()

    service = module.get<ProdutosService>(ProdutosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be get produto by id with all information', async () => {
    const shouldReturn = {
      id: 3,
      nome: 'Calça Jeans',
      valorBase: 100,
      descricao: 'Calça boa',
      codigo: 'CAS-MALOK',
      variacoes: [
        {
          id: 1,
          descricao: 'Tamanho',
          alternativas: [
            {
              id: 2,
              nome: '46',
              valor: 40,
              quantidade: 10,
              codigo: '46',
            },
            {
              id: 1,
              nome: '60',
              valor: 30,
              quantidade: 5,
              codigo: '60',
            },
          ],
        },
      ],
    } as any

    repo.findOne.mockResolvedValue(shouldReturn as any)
    await expect(service.getByIdWithAllInformation(3)).resolves.toStrictEqual(
      shouldReturn,
    )
    expect(repo.findOne).toBeCalledWith(3, { relations: ['variacoes'] })
  })

  it('should update pedido', async () => {
    const shouldReturn = {
      nome: 'Calça Jeans',
      descricao: 'Calça boa',
      valorBase: 100,
      codigo: 'CAS-MALOK',
      variacoes: [
        {
          descricao: 'Tamanho',
          alternativas: [
            {
              nome: '60',
              codigo: '60',
              quantidade: 5,
              valor: 30,
              id: 1,
            },
            {
              nome: '46',
              codigo: '46',
              quantidade: 10,
              valor: 40,
              id: 2,
            },
          ],
          id: 1,
        },
      ],
      id: 1,
    } as any

    const masterEntityManager = createMock<EntityManager>()
    const masterConnection = createMock<Connection>()
    const mockQueryRunner = createMock<QueryRunner>()
    const mockEntityManager = createMock<EntityManager>()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    repo.manager = masterEntityManager
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    masterEntityManager.connection = masterConnection
    masterConnection.createQueryRunner.mockReturnValue(mockQueryRunner)

    mockQueryRunner.connect.mockReturnThis()
    mockQueryRunner.startTransaction.mockReturnThis()
    mockQueryRunner.release.mockReturnThis()
    mockQueryRunner.commitTransaction.mockReturnThis()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockQueryRunner.manager = mockEntityManager

    mockEntityManager.save.mockResolvedValue(shouldReturn as any)
    mockEntityManager.delete.mockReturnThis()

    await expect(
      service.updateProduto(shouldReturn, shouldReturn),
    ).resolves.toStrictEqual(shouldReturn)
  })
})
