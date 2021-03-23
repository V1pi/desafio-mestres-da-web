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
})
