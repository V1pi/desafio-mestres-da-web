import { PostgresDatabase } from '../../common/databases/postgres.database'
import { RegistrarRepository } from './registrar.repository'
import { HttpException } from '../../common/exceptions/http.exception'

describe('Registrar repossitory', () => {
  let functionsRepo = {}
  const mockRepo = jest.fn(() => functionsRepo)
  const mockConnection = jest.fn(() => {
    return {
      getRepository: mockRepo,
    }
  })
  const mockPostgresDatabase = {
    getConnection: mockConnection,
  }
  beforeEach(() => {
    jest
      .spyOn(PostgresDatabase, 'Instance', 'get')
      .mockReturnValue(mockPostgresDatabase as any)
  })
  it('should do create', async () => {
    const shouldReturn = {
      id: 2,
      email: 'vimivini@gmail.com',
      nome: 'Vinicius Picanço',
      papel: 0,
      uid: 'JBLfghCnemTuENmzV6Co0Jz5TuX2',
    }
    functionsRepo = {
      save: jest.fn(() => Promise.resolve(shouldReturn)),
    }
    const registrarRepository = new RegistrarRepository()
    await expect(
      registrarRepository.create({
        nome: 'Vinicius Picanço',
        email: 'vimivini@gmail.com',
      }),
    ).resolves.toStrictEqual(shouldReturn)
  })
  it('should not create', async () => {
    functionsRepo = {
      save: jest.fn(() => Promise.resolve(undefined)),
    }
    const registrarRepository = new RegistrarRepository()
    await expect(
      registrarRepository.create({
        nome: 'Vinicius Picanço',
        email: 'vimivini@gmail.com',
      }),
    ).rejects.toThrow(HttpException)
  })
})
