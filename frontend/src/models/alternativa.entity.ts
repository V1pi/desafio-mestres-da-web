import { BaseModel } from './base.entity'
import { Variacao } from './variacao.entity'

export class Alternativa extends BaseModel<Alternativa> {
  id!: number

  nome!: string

  valor!: number

  quantidade!: number

  codigo!: string

  variacao!: Variacao

  fillFromJson(json: any): Alternativa {
    if (!json) {
      return this
    }
    this.id = json.id
    this.codigo = json.codigo as string
    this.nome = json.nome as string
    this.valor = json.valor as number
    this.quantidade = json.quantidade as number
    if (json.variacao) {
      this.variacao = Variacao.fromJson(json.variacao)
    }
    return this
  }

  public static fromJson(json: any): Alternativa {
    return new Alternativa().fillFromJson(json)
  }
}
