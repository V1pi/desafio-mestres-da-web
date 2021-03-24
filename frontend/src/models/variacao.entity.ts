import { JsonHelper } from '../helpers/json.helper'
import { Alternativa } from './alternativa.entity'
import { BaseModel } from './base.entity'
import { Produto } from './produto.entity'

export class Variacao extends BaseModel<Variacao> {
  id!: number

  descricao!: string

  produto!: Produto

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
