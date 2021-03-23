import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { RegistrarService } from './registrar.service'
import { Usuario } from '../../models/usuario/usuario.entity'
import { createMock } from '@golevelup/nestjs-testing'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('RegistrarService', () => {
  let service: RegistrarService
  const repo = createMock<Repository<Usuario>>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrarService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: repo,
        },
      ],
    }).compile()

    service = module.get<RegistrarService>(RegistrarService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
