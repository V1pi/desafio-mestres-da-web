import { Test, TestingModule } from '@nestjs/testing'
import { createMock, DeepMocked } from '@golevelup/nestjs-testing'
import {
  Connection,
  Repository,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AllException } from '../exceptions/all.exception'
import { Provider } from '@nestjs/common'
import { BaseService } from './base.service'
import { RegistrarService } from '../../routes/registrar/registrar.service'
import { Usuario } from '../../models/usuario/usuario.entity'

describe('Base Service Test', () => {
  const services: BaseService<any>[] = []
  const repos: DeepMocked<Repository<any>>[] = []
  const connection = createMock<Connection>()
  beforeEach(async () => {
    const servicesTemp = [RegistrarService] // Aqui coloca todos os services que utilizam o base.service

    const models = [Usuario] // Aqui coloca todos os models que utilizam o base.service nos seus services
    const providers: Provider<any>[] = []
    services.length = 0
    repos.length = 0
    for (const model of models) {
      const repo = createMock<Repository<typeof model>>()
      providers.push({
        provide: getRepositoryToken(model),
        useValue: repo,
      })
      repos.push(repo)
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...servicesTemp,
        ...providers,
        { provide: Connection, useValue: connection },
      ],
    }).compile()

    for (const service of servicesTemp) {
      services.push(module.get(service as any))
    }
  })

  it('should be get all', async () => {
    const shouldReturn = [
      {
        nome: 'Vinicius Picanco',
      },
    ]
    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      repo.find.mockReturnValue(shouldReturn as any)

      expect(await service.getAll()).toBe(shouldReturn)
      expect(repo.find).toHaveBeenCalled()

      repo.find.mockClear()
      repo.find.mockReturnValue(null)

      await expect(service.getAll()).rejects.toThrow(AllException)
    }
  })

  it('should be get by id', async () => {
    const shouldReturn = {
      nome: 'Vinicius Picanco',
    }
    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      repo.findOne.mockReturnValue(shouldReturn as any)

      expect(await service.getByID(1)).toBe(shouldReturn)

      expect(repo.findOne).toHaveBeenCalledTimes(1)
      expect(repo.findOne).toHaveBeenCalledWith(1)

      repo.findOne.mockClear()
      repo.findOne.mockReturnValue(null)

      await expect(service.getByID(1)).rejects.toThrow(AllException)
    }
  })

  it('should be create', async () => {
    const shouldReturn = {
      id: 1,
      nome: 'Vinicius Picanco',
    }
    const createParam = {
      nome: 'Vinicius Picanco',
    }
    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      repo.save.mockReturnValue(shouldReturn as any)

      expect(await service.create(createParam)).toBe(shouldReturn)

      expect(repo.save).toHaveBeenCalledTimes(1)
      expect(repo.save).toHaveBeenCalledWith(createParam)

      repo.save.mockClear()
      repo.save.mockReturnValue(null)

      await expect(service.create(createParam)).rejects.toThrow(AllException)
    }
  })

  it('should be update', async () => {
    const shouldReturn = {
      id: 1,
      nome: 'Vinicius Picanco',
    }
    const updateParam = {
      nome: 'Vinicius Picanco',
    }
    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      repo.update.mockResolvedValue({ affected: 1 } as any)
      repo.findOneOrFail.mockResolvedValue(shouldReturn as any)

      expect(await service.update(1, updateParam as any)).toBe(shouldReturn)

      expect(repo.update).toHaveBeenCalledTimes(1)
      expect(repo.update).toHaveBeenCalledWith(1, updateParam)

      repo.update.mockClear()
      repo.update.mockResolvedValue({ affected: 0 } as any)

      await expect(service.update(1, updateParam as any)).rejects.toThrow(
        AllException,
      )
    }
  })

  it('should be bulk update', async () => {
    const updateParam = {
      nome: 'Vinicius Picanco',
    }
    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      const mockUpdate = createMock<SelectQueryBuilder<any>>()
      const mockWhere = createMock<UpdateQueryBuilder<any>>()
      const mockExecute = createMock<UpdateQueryBuilder<any>>()
      mockUpdate.update.mockReturnValue(mockWhere)
      mockWhere.where.mockReturnValue(mockExecute)
      mockExecute.execute.mockResolvedValue({ affected: 3 } as any)

      repo.createQueryBuilder.mockReturnValue(mockUpdate)

      await expect(
        service.bulkUpdate([1, 2, 3], updateParam as any),
      ).resolves.toBeUndefined()

      expect(mockExecute.execute).toHaveBeenCalledTimes(1)

      mockExecute.execute.mockClear()
      mockExecute.execute.mockResolvedValue({ affected: 0 } as any)

      await expect(
        service.bulkUpdate([1, 2, 3], updateParam as any),
      ).rejects.toThrow(AllException)
    }
  })

  it('should be delete', async () => {
    const shouldReturn = {
      affected: 1,
    }

    for (let i = 0; i < services.length; i++) {
      const repo = repos[i]
      const service = services[i]

      expect(service).toBeDefined()

      repo.delete.mockResolvedValue(shouldReturn as any)

      await service.delete(1)

      expect(repo.delete).toHaveBeenCalledTimes(1)
      expect(repo.delete).toHaveBeenCalledWith(1)

      repo.delete.mockClear()
      repo.delete.mockResolvedValue({ affected: 0 } as any)

      await expect(service.delete(1)).rejects.toThrow(AllException)
    }
  })
})
