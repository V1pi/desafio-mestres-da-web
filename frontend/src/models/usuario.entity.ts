import { BaseModel } from './base.entity'

export class Usuario extends BaseModel<Usuario> {
  id!: number

  nome!: string

  papel!: number

  uid!: string

  email!: string

  fillFromJson(json: any): Usuario {
    if (!json) {
      return this
    }
    this.id = json.id
    this.email = json.email as string
    this.nome = json.nome as string
    this.papel = json.papel as number
    this.uid = json.uid as string
    return this
  }

  public static fromJson(json: any): Usuario {
    return new Usuario().fillFromJson(json)
  }
}
