import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin'
import { createMock } from '@golevelup/nestjs-testing'
import { Test, TestingModule } from '@nestjs/testing'
import { RegistrarController } from './registrar.controller'
import { RegistrarService } from './registrar.service'

describe('RegistrarController', () => {
  let controller: RegistrarController
  const repo = createMock<RegistrarService>()
  const mockFirebaseUser = createMock<FirebaseAuthenticationService>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RegistrarService,
          useValue: repo,
        },
        {
          provide: FirebaseAuthenticationService,
          useValue: mockFirebaseUser,
        },
      ],
      controllers: [RegistrarController],
    }).compile()

    controller = module.get<RegistrarController>(RegistrarController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create administrador', async () => {
    const shouldReturn = {
      error_id: -1,
      message: 'Sucesso!',
      error: false,
      data: {
        administrador: {
          nome: 'Vinicius Picanço',
          email: 'vimivini99@gmail.com',
          papel: 0,
          uid: 'm4ug9Dz5CzSTtMD28Z8nhNjqWWH2',
          id: 1,
        },
      },
    }

    const dto = {
      nome: 'Vinicius Picanço',
      email: 'vimivini99@gmail.com',
      senha: '123456',
    } as any

    repo.create.mockResolvedValue(shouldReturn.data.administrador as any)
    mockFirebaseUser.createUser.mockResolvedValue({
      uid: 'm4ug9Dz5CzSTtMD28Z8nhNjqWWH2',
    } as any)
    mockFirebaseUser.setCustomUserClaims.mockReturnThis()
    await expect(controller.registerCliente(dto)).resolves.toStrictEqual(
      shouldReturn,
    )
  })
})
