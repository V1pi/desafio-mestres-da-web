import { PostgresDatabase } from '../../common/databases/postgres.database'
import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { HttpException } from '../../common/exceptions/http.exception'
import { Produto } from '../../models/produto/produto.entity'
import { Alternativa } from '../../models/alternativa/alternativa.entity'
import { Variacao } from '../../models/variacao/variacao.entity'
import { DeepPartial, Repository } from 'typeorm'

export class ProdutoRepository {
  public repository: Repository<Produto>
  constructor() {
    this.repository = PostgresDatabase.Instance.getConnection().getRepository(
      Produto,
    )
  }

  async create(obj: DeepPartial<Produto>): Promise<Produto> {
    const status = await this.repository.save(obj)

    if (!status) {
      throw new HttpException(TipoErro.ERROR_AO_SALVAR)
    }

    return status
  }

  public async getByIdWithAllInformation(id: number): Promise<Produto> {
    const status = await this.repository.findOne(id, {
      relations: ['variacoes'],
    })

    if (!status) {
      throw new HttpException(TipoErro.ID_NAO_ENCONTRADO)
    }
    return status
  }

  public async delete(id: number): Promise<void> {
    const status = await this.repository.delete(id)

    if (!status.affected || status.affected < 1) {
      throw new HttpException(TipoErro.ID_NAO_ENCONTRADO)
    }
  }

  public async getAll(): Promise<Produto[]> {
    const status = await this.repository.find()

    if (!status) {
      throw new HttpException(TipoErro.ID_NAO_ENCONTRADO)
    }
    return status
  }

  public async updateProduto(
    oldProduto: Produto,
    newProduto: Produto,
  ): Promise<Produto> {
    const queryRunner = this.repository.manager.connection.createQueryRunner()

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
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      throw new HttpException(TipoErro.ERROR_AO_SALVAR)
    }
  }
}
