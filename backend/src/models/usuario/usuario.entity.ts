import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { BaseModel } from '../basis/base.entity'
import { UsuarioInterface } from './usuario.interface'

@Entity('usuario')
export class Usuario extends BaseModel<Usuario> implements UsuarioInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  nome!: string

  @Column('int', { nullable: false })
  papel!: number

  @Column('text', { nullable: false })
  uid!: string

  fillFromJson(json: any): Usuario {
    if (!json) {
      return this
    }
    this.id = json.id
    this.nome = json.nome as string
    this.papel = json.papel as number
    this.uid = json.uid as string
    return this
  }

  public static fromJson(json: any): Usuario {
    return new Usuario().fillFromJson(json)
  }
}
