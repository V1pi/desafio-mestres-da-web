import { TipoErro } from '../common/enums/tipo-erro.enum'
import { Request, Response } from 'express'
import { ResponseDefault } from '../common/interfaces/response-default.interface'
import { Usuario } from '../models/usuario/usuario.entity'
import { RegistrarRepository } from '../repositories/registrar.repository'
import { TipoUsuario } from '../common/enums/tipo-usuario.enum'

export class RegistrarController {
  private repo: RegistrarRepository

  constructor() {
    this.repo = new RegistrarRepository()
  }
  public async create(req: Request, res: Response): Promise<Response> {
    req.body.uid = 'asds'
    req.body.papel = TipoUsuario.ADMIN
    const newUser = await this.repo.create(Usuario.fromJson(req.body))
    return res.status(201).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {
        administrador: newUser,
      },
    } as ResponseDefault)
  }
}
