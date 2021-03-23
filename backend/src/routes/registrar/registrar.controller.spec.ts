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
})
