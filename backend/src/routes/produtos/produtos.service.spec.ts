import { Test, TestingModule } from '@nestjs/testing'
import { ProdutosService } from './produtos.service'
import { createMock } from '@golevelup/nestjs-testing'
import { Repository } from 'typeorm'
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
})
