import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '../../common/services/base.service'
import { Produto } from '../../models/produto/produto.entity'
import { Repository } from 'typeorm'
import { AllException } from '../../common/exceptions/all.exception'
import { TipoErro } from '../../common/enums/tipo-erro.enum'

@Injectable()
export class ProdutosService extends BaseService<Produto> {
  constructor(@InjectRepository(Produto) repo: Repository<Produto>) {
    super(repo)
  }
  public async getByIdWithAllInformation(id: number): Promise<Produto> {
    const status = await this.repo.findOne(id, { relations: ['variacoes'] })

    if (!status) {
      throw new AllException(TipoErro.ID_NAO_ENCONTRADO)
    }
    return status
  }
}
