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

  it('should be create produto', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {
        produto: {
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
        },
      },
    }

    const dto = {
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
    } as any

    repo.create.mockResolvedValue(shouldReturn.data.produto as any)
    await expect(controller.newProduto(dto)).resolves.toStrictEqual(
      shouldReturn as any,
    )
    expect(repo.create).toBeCalledWith(dto)
  })

  it('should be update produto', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {
        produto: {
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
        },
      },
    }

    const dto = {
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
    repo.getByID.mockResolvedValue(shouldReturn.data.produto as any)
    repo.create.mockResolvedValue(shouldReturn.data.produto as any)
    await expect(controller.updateProduto(1, dto)).resolves.toStrictEqual(
      shouldReturn,
    )
    expect(repo.create).toBeCalledWith(dto)
    expect(repo.getByID).toBeCalledWith(1)
  })

  it('should be get all produtos', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {
        produtos: [
          {
            id: 1,
            nome: 'Calça Jeans',
            valorBase: 100,
            descricao: 'Calça boa',
            codigo: 'CAS-MALOK',
          },
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
        ],
      },
    }

    repo.getAll.mockResolvedValue(shouldReturn.data.produtos as any)
    await expect(controller.getAllProdutos()).resolves.toStrictEqual(
      shouldReturn,
    )
  })

  it('should be get produto by id', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {
        produto: {
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
        },
      },
    }

    repo.getByIdWithAllInformation.mockResolvedValue(
      shouldReturn.data.produto as any,
    )
    await expect(controller.getById(3)).resolves.toStrictEqual(shouldReturn)
    expect(repo.getByIdWithAllInformation).toBeCalledWith(3)
  })

  it('should be delete produto by id', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {},
    } as any

    repo.delete.mockReturnThis()
    await expect(controller.deleteProduto(3)).resolves.toStrictEqual(
      shouldReturn,
    )
    expect(repo.delete).toBeCalledWith(3)
  })
})
