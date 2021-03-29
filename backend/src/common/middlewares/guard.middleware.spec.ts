import { NextFunction, Request, Response } from 'express'
import { TipoErro } from '../enums/tipo-erro.enum'
import { TipoUsuario } from '../enums/tipo-usuario.enum'
import { HttpException } from '../exceptions/http.exception'
import { guardMiddleware } from './guard.middeware'
import * as admin from 'firebase-admin'
describe('Guard middleware', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const nextFunction: NextFunction = jest.fn()
  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: jest.fn(),
    }
  })

  test('without headers', async () => {
    await guardMiddleware([TipoUsuario.ADMIN])(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalledWith(
      new HttpException(TipoErro.USUARIO_SEM_PERMISSAO),
    )
  })

  test('without authorization header', async () => {
    mockRequest = {
      headers: {},
    }
    await guardMiddleware([TipoUsuario.ADMIN])(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalledWith(
      new HttpException(TipoErro.USUARIO_SEM_PERMISSAO),
    )
  })

  test('with authorization header', async () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    }
    jest.spyOn(admin, 'auth').mockImplementation(() => {
      return {
        verifyIdToken: jest.fn(async () =>
          Promise.resolve({
            uid: 'uid-valido',
          }),
        ),
        getUser: jest.fn(async () =>
          Promise.resolve({
            customClaims: {
              role: TipoUsuario.ADMIN,
            },
          }),
        ),
      } as any
    })
    await guardMiddleware([TipoUsuario.ADMIN])(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalled()
  })

  test('with authorization header and wrong user role', async () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    }
    jest.spyOn(admin, 'auth').mockImplementation(() => {
      return {
        verifyIdToken: jest.fn(async () =>
          Promise.resolve({
            uid: 'uid-valido',
          }),
        ),
        getUser: jest.fn(async () =>
          Promise.resolve({
            customClaims: {
              role: 50,
            },
          }),
        ),
      } as any
    })
    await guardMiddleware([TipoUsuario.ADMIN])(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    )
    expect(nextFunction).toBeCalledWith(
      new HttpException(TipoErro.USUARIO_SEM_PERMISSAO),
    )
  })
})
