import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { BaseModel } from '../basis/base.entity'
import { Variacao } from '../variacao/variacao.entity'
import { AlternativaInterface } from './alternativa.interface'

@Entity('alternativa')
export class Alternativa extends BaseModel<Alternativa> implements AlternativaInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  nome!: string

  @Column('double precision', { nullable: false })
  valor!: number

  @Column('int', { nullable: false })
  quantidade!: number

  @Column('text', { nullable: false })
  codigo!: string

  @ManyToOne(
    type => Variacao,
    variacao => variacao.alternativas,
    { cascade: false },
  )
  @JoinColumn({ name: 'id_alternativa' })
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
    return new Alternativa(
    ).fillFromJson(json)
  }
}
