import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm'
import { BaseModel } from '../basis/base.entity'
import { Variacao } from '../variacao/variacao.entity'
import { ProdutoInterface } from './produto.interface'
import { JsonHelper } from '../../common/helpers/json.helper'

@Entity('produto')
export class Produto extends BaseModel<Produto> implements ProdutoInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  nome!: string

  @Column('double precision', { nullable: true, name: 'valor_base' })
  valorBase!: number

  @Column('text', { nullable: true })
  descricao!: string

  @Column('text', { nullable: false })
  codigo!: string

  @OneToMany(
    type => Variacao,
    variacoes => variacoes.produto,
  )
  variacoes!: Variacao[]


  fillFromJson(json: any): Produto {
    if (!json) {
      return this
    }
    this.id = json.id
    this.codigo = json.codigo as string
    this.nome = json.nome as string
    this.valorBase = json.valorBase as number
    this.descricao = json.descricao as string
    this.variacoes = JsonHelper.jsonToArray<Variacao>(
      json.variacoes,
      Variacao.fromJson,
    )
    return this
  }

  public static fromJson(json: any): Produto {
    return new Produto(
    ).fillFromJson(json)
  }
}
