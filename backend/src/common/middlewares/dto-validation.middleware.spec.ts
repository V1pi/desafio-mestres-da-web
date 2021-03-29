jest.mock('class-transformer')
jest.mock('class-sanitizer')
jest.mock('class-validator')
import { NextFunction, Request, Response } from 'express'
import { TipoErro } from '../enums/tipo-erro.enum'
import { HttpException } from '../exceptions/http.exception'
import dtoValidationMiddleware from './dto-validation.middleware'

describe('Guard middleware', () => {
  let mockRequest: Partial<Request>
  const mockedType = jest.fn()
  let mockResponse: Partial<Response>
  const nextFunction: NextFunction = jest.fn()
  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
    }
  })
  test('no body', async () => {
    await dtoValidationMiddleware(mockedType)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalledWith(
      new HttpException(TipoErro.DADOS_INVALIDOS),
    )
  })

  test('body right', async () => {
    const { plainToClass } = jest.requireMock('class-transformer')
    const { validate } = jest.requireMock('class-validator')
    const { sanitize } = jest.requireMock('class-sanitizer')
    sanitize.mockReturnThis()
    plainToClass.mockReturnValue({
      nome: 'Vinicius',
    })
    validate.mockResolvedValue([])
    await dtoValidationMiddleware(mockedType)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toReturn()
  })

  test('body error', async () => {
    const { plainToClass } = jest.requireMock('class-transformer')
    const { validate } = jest.requireMock('class-validator')
    const { sanitize } = jest.requireMock('class-sanitizer')
    sanitize.mockReturnThis()
    plainToClass.mockReturnValue({
      nome: '',
    })
    validate.mockResolvedValue([
      { constraints: { nome: 'Deve haver mais que 3 caracteres' } },
    ])
    await dtoValidationMiddleware(mockedType)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalledWith(
      new HttpException(
        TipoErro.DADOS_INVALIDOS,
        'Deve haver mais que 3 caracteres',
      ),
    )
  })
})
