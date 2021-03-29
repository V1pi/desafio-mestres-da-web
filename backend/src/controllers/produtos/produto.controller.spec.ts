jest.mock('../../repositories/produtos/produto.repository')
import { ProdutoController } from './produto.controller'
import { Request, Response } from 'express'
describe('Produto controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const { ProdutoRepository } = jest.requireMock(
    '../../repositories/produtos/produto.repository',
  )
  const mockJson = jest.fn()
  let repoMock = {}
  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      status: jest.fn(() => {
        return { json: mockJson } as any
      }),
      json: jest.fn(),
    }
  })

  it('should be create new produto', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {
        produto: {
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
        },
      },
    }
    repoMock = {
      create: jest.fn(() => Promise.resolve(shouldReturn.data.produto)),
    }
    ProdutoRepository.mockReturnValue(repoMock)
    mockRequest = {
      body: {
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
      },
    }
    const produtoController = new ProdutoController()
    await produtoController.new(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })

  it('should be update produto', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {
        produto: {
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
        },
      },
    }
    repoMock = {
      getByIdWithAllInformation: jest.fn(() =>
        Promise.resolve(shouldReturn.data.produto),
      ),
      updateProduto: jest.fn(() => Promise.resolve(shouldReturn.data.produto)),
    }
    ProdutoRepository.mockReturnValue(repoMock)
    mockRequest = {
      params: { id: '1' },
      body: {
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
      },
    }
    const produtoController = new ProdutoController()
    await produtoController.updateProduto(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })

  it('should delete produto', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {},
    }
    repoMock = {
      delete: jest.fn(),
    }
    ProdutoRepository.mockReturnValue(repoMock)
    mockRequest = {
      params: { id: '1' },
    }
    const produtoController = new ProdutoController()
    await produtoController.deleteProduto(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })

  it('should get by id produto', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {
        produto: {
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
        },
      },
    }
    repoMock = {
      getByIdWithAllInformation: jest.fn(() =>
        Promise.resolve(shouldReturn.data.produto),
      ),
    }
    ProdutoRepository.mockReturnValue(repoMock)
    mockRequest = {
      params: { id: '1' },
    }
    const produtoController = new ProdutoController()
    await produtoController.getById(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })

  it('should get all produtos', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {
        produtos: [
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
    repoMock = {
      getAll: jest.fn(() => Promise.resolve(shouldReturn.data.produtos)),
    }
    ProdutoRepository.mockReturnValue(repoMock)
    mockRequest = {}
    const produtoController = new ProdutoController()
    await produtoController.getAllProdutos(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })
})
