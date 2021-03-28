import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '../../common/services/base.service'
import { Produto } from '../../models/produto/produto.entity'
import { Repository } from 'typeorm'
import { AllException } from '../../common/exceptions/http.exception'
import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { Variacao } from '../../models/variacao/variacao.entity'
import { Alternativa } from '../../models/alternativa/alternativa.entity'

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

  public async updateProduto(
    oldProduto: Produto,
    newProduto: Produto,
  ): Promise<Produto> {
    const queryRunner = this.repo.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      if (oldProduto.variacoes) {
        const variacoesToBeRemoved: number[] = []
        for (const variacao of oldProduto.variacoes) {
          let canRemove = true
          for (const newV of newProduto.variacoes) {
            if (newV.id && newV.id === variacao.id) {
              canRemove = false
            }
          }
          if (canRemove) {
            variacoesToBeRemoved.push(variacao.id)
          }
        }
        if (variacoesToBeRemoved.length > 0) {
          await queryRunner.manager.delete(Variacao, variacoesToBeRemoved)
        }
        const alternativasToBeRemoved: number[] = []
        for (const newV of newProduto.variacoes) {
          if (newV.id) {
            const oldV = oldProduto.variacoes.filter((e) => e.id === newV.id)[0]
            for (const oldAlternativa of oldV.alternativas) {
              let canRemove = true
              for (const newAlternativa of newV.alternativas) {
                if (
                  newAlternativa.id &&
                  newAlternativa.id === oldAlternativa.id
                ) {
                  canRemove = false
                }
              }
              if (canRemove) {
                alternativasToBeRemoved.push(oldAlternativa.id)
              }
            }
          }
        }
        if (alternativasToBeRemoved.length > 0) {
          await queryRunner.manager.delete(Alternativa, alternativasToBeRemoved)
        }
      }
      const produto = await queryRunner.manager.save(Produto, newProduto)
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return produto
    } catch (err) {
      console.log(err)
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      throw new AllException(TipoErro.ERROR_AO_SALVAR)
    }
  }
}
