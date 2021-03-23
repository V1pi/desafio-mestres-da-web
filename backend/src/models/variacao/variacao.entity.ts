import { JsonHelper } from '../../common/helpers/json.helper'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Alternativa } from '../alternativa/alternativa.entity'
import { BaseModel } from '../basis/base.entity'
import { Produto } from '../produto/produto.entity'
import { VariacaoInterface } from './variacao.interface'

@Entity('variacao')
export class Variacao extends BaseModel<Variacao> implements VariacaoInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  descricao!: string

  @ManyToOne((type) => Produto, (produto) => produto.variacoes, {
    cascade: false,
  })
  @JoinColumn({ name: 'id_produto' })
  produto!: Produto

  @OneToMany((type) => Alternativa, (alternativas) => alternativas.variacao, {
    cascade: true,
    eager: true,
  })
  alternativas!: Alternativa[]

  fillFromJson(json: any): Variacao {
    if (!json) {
      return this
    }
    this.id = json.id
    this.descricao = json.descricao as string
    this.alternativas = JsonHelper.jsonToArray<Alternativa>(
      json.alternativas,
      Alternativa.fromJson,
    )
    if (json.produto) {
      this.produto = Produto.fromJson(json.produto)
    }
    return this
  }

  public static fromJson(json: any): Variacao {
    return new Variacao().fillFromJson(json)
  }
}
