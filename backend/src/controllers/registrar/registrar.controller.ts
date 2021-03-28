import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { Request, Response } from 'express'
import { ResponseDefault } from '../../common/interfaces/response-default.interface'
import { Usuario } from '../../models/usuario/usuario.entity'
import { RegistrarRepository } from '../../repositories/registrar/registrar.repository'
import { TipoUsuario } from '../../common/enums/tipo-usuario.enum'
import * as admin from 'firebase-admin'
export class RegistrarController {
  private repo: RegistrarRepository
  private auth: admin.auth.Auth

  constructor() {
    this.repo = new RegistrarRepository()
    this.auth = admin.auth()
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const registerAdministradorDto = req.body
    const user = await this.auth.createUser({
      email: registerAdministradorDto.email,
      password: registerAdministradorDto.senha,
      displayName: registerAdministradorDto.nome,
    })
    await this.auth.setCustomUserClaims(user.uid, {
      role: TipoUsuario.ADMIN,
    })
    registerAdministradorDto.papel = TipoUsuario.ADMIN
    registerAdministradorDto.uid = user.uid
    try {
      const newUser = await this.repo.create(Usuario.fromJson(req.body))
      return res.status(201).json({
        error: false,
        error_id: TipoErro.SEM_ERROS,
        message: 'Sucesso!',
        data: {
          administrador: newUser,
        },
      } as ResponseDefault)
    } catch (error) {
      this.auth.deleteUser(user.uid)
      throw error
    }
  }
}
