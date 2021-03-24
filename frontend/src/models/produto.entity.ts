import { BaseModel } from './base.entity'
import { Variacao } from './variacao.entity'
import { JsonHelper } from '../helpers/json.helper'

export class Produto extends BaseModel<Produto> {
  id!: number

  nome!: string

  valorBase!: number

  descricao!: string

  codigo!: string

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
    return new Produto().fillFromJson(json)
  }
}
