import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Usuario } from '../../models/usuario/usuario.entity'
import { Repository } from 'typeorm'
import { BaseService } from '../../common/services/base.service'

@Injectable()
export class RegistrarService extends BaseService<Usuario> {
  constructor(@InjectRepository(Usuario) repo: Repository<Usuario>) {
    super(repo)
  }
}
