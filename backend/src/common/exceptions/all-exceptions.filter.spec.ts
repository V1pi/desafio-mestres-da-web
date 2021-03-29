import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../enums/http-status.enum'
import { TipoErro } from '../enums/tipo-erro.enum'
import { allExceptionsFilter } from './all-exceptions.filter'
import { HttpException } from './http.exception'
describe('All exception filter', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const nextFunction: NextFunction = jest.fn()
  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
    }
  })
  test('should return exception formatted', async () => {
    const exception = new HttpException(
      TipoErro.USUARIO_SEM_PERMISSAO,
      'Erro teste',
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
    const mockJson = jest.fn()
    const mockStatus = jest.fn(
      (): Response => {
        return {
          json: mockJson,
        } as any
      },
    )
    mockResponse = {
      status: mockStatus,
      headersSent: false,
    }
    await allExceptionsFilter()(
      exception,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(mockJson).toBeCalledWith({
      error: true,
      error_id: exception.tipoErroDado.errorId,
      data: [],
      message: exception.tipoErroDado.message,
    })
    expect(nextFunction).toHaveBeenCalledTimes(0)
  })

  test('show do not throw exception', async () => {
    const exception = new HttpException(
      TipoErro.USUARIO_SEM_PERMISSAO,
      'Erro teste',
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
    const mockJson = jest.fn()
    const mockStatus = jest.fn(
      (): Response => {
        return {
          json: mockJson,
        } as any
      },
    )
    mockResponse = {
      status: mockStatus,
      headersSent: true,
    }
    await allExceptionsFilter()(
      exception,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalled()
    expect(mockJson).toHaveBeenCalledTimes(0)
  })
})
