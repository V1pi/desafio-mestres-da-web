jest.mock('../../repositories/registrar/registrar.repository')
import { RegistrarController } from './registrar.controller'
import * as admin from 'firebase-admin'
import { Request, Response } from 'express'
import { TipoUsuario } from '../../common/enums/tipo-usuario.enum'
describe('Registrar controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  const { RegistrarRepository } = jest.requireMock(
    '../../repositories/registrar/registrar.repository',
  )
  const mockJson = jest.fn()
  let repoMock = {}
  beforeEach(() => {
    jest.spyOn(admin, 'auth').mockImplementation(() => {
      return {
        createUser: jest.fn(async () =>
          Promise.resolve({
            uid: 'uid-valido',
          }),
        ),
        setCustomUserClaims: jest.fn(),
      } as any
    })
    mockRequest = {}
    mockResponse = {
      status: jest.fn(() => {
        return { json: mockJson } as any
      }),
      json: jest.fn(),
    }
  })

  it('should be create new user', async () => {
    const shouldReturn = {
      error: false,
      error_id: -1,
      message: 'Sucesso!',
      data: {
        administrador: {
          id: 2,
          email: 'vimivini@gmail.com',
          nome: 'Vinicius Picanço',
          papel: 0,
          uid: 'JBLfghCnemTuENmzV6Co0Jz5TuX2',
        },
      },
    }
    repoMock = {
      create: jest.fn(() => Promise.resolve(shouldReturn.data.administrador)),
    }
    RegistrarRepository.mockReturnValue(repoMock)
    mockRequest = {
      body: {
        nome: 'Vinicius Picanço',
        email: 'vimivini@gmail.com',
        senha: '123456',
      },
    }
    const registrarController = new RegistrarController()
    await registrarController.create(
      mockRequest as Request,
      mockResponse as Response,
    )
    expect(mockJson).toBeCalledWith(expect.objectContaining(shouldReturn))
  })
})
