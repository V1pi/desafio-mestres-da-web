import { PostgresDatabase } from '../../common/databases/postgres.database'
import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { HttpException } from '../../common/exceptions/http.exception'
import { Usuario } from '../../models/usuario/usuario.entity'
import { DeepPartial, Repository } from 'typeorm'

export class RegistrarRepository {
  public repository: Repository<Usuario>
  constructor() {
    this.repository = PostgresDatabase.Instance.getConnection().getRepository(
      Usuario,
    )
  }

  async create(obj: DeepPartial<Usuario>): Promise<Usuario> {
    const status = await this.repository.save(obj)

    if (!status) {
      throw new HttpException(TipoErro.ERROR_AO_SALVAR)
    }

    return status
  }
}
