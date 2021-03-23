import { In, Repository } from 'typeorm'
import { TipoErro } from '../enums/tipo-erro.enum'
import { AllException } from '../exceptions/all.exception'
import { BaseModel } from '../../models/basis/base.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class BaseService<T extends BaseModel<T>> {
  constructor(protected repo: Repository<T>) {}

  async create(obj: any): Promise<T> {
    const status = await this.repo.save(obj)

    if (!status) {
      throw new AllException(TipoErro.ERROR_AO_SALVAR)
    }

    return status
  }

  async getByID(id: number): Promise<T> {
    const status = await this.repo.findOne(id)

    if (!status) {
      throw new AllException(TipoErro.ID_NAO_ENCONTRADO)
    }
    return status
  }

  async getAll(): Promise<T[]> {
    const values: Array<T> = await this.repo.find()

    if (!values) {
      throw new AllException(TipoErro.ID_NAO_ENCONTRADO)
    }

    return values
  }

  async update(id: number, obj: QueryDeepPartialEntity<T>): Promise<T> {
    const status = await this.repo.update(id, obj)
    if (!status.affected) {
      throw new AllException(TipoErro.ERROR_AO_ATUALIZAR)
    }
    return this.repo.findOneOrFail(id)
  }

  async bulkUpdate(
    id: number[],
    obj: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    const status = await this.repo
      .createQueryBuilder()
      .update(obj)
      .where({ id: In(id) })
      .execute()

    if (!status.affected) {
      throw new AllException(TipoErro.ERROR_AO_ATUALIZAR)
    }
  }

  async delete(id: number): Promise<void> {
    const status = await this.repo.delete(id)

    if (status.affected === 0) {
      throw new AllException(TipoErro.ERROR_AO_DELETAR)
    }
  }
}
