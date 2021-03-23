import { Test, TestingModule } from '@nestjs/testing'
import { ProdutosController } from './produtos.controller'
import { createMock } from '@golevelup/nestjs-testing'
import { ProdutosService } from './produtos.service'

describe('ProdutosController', () => {
  let controller: ProdutosController
  const repo = createMock<ProdutosService>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProdutosService,
          useValue: repo,
        },
      ],
      controllers: [ProdutosController],
    }).compile()

    controller = module.get<ProdutosController>(ProdutosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
