import { ApiHelper } from '../helpers/api.helper'
import { Usuario } from '../models/usuario.entity'

export class RegisterController {
  public async register(
    email: string,
    senha: string,
    nome: string,
  ): Promise<Usuario | undefined> {
    const response = await ApiHelper.Instance.RequestWithoutAuth(
      'registrar/administrador',
      'POST',
      {
        email,
        senha,
        nome,
      },
    )
    if (response.data.administrador) {
      const newUsuario = Usuario.fromJson(response.data.administrador)
      return newUsuario
    }
  }
}
