import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin'
import { Body, Controller, Post } from '@nestjs/common'
import { ResponseDefault } from 'src/common/interfaces/response-default.interface'
import { RegistrarService } from './registrar.service'
import { CreateAdministradorDto } from './dto/create-administrador.dto'
import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { TipoUsuario } from '../../common/enums/tipo-usuario.enum'
@Controller('registrar')
export class RegistrarController {
  constructor(
    private serv: RegistrarService,
    private auth: FirebaseAuthenticationService,
  ) {}

  @Post('administrador')
  public async registerCliente(
    @Body() registerAdministradorDto: CreateAdministradorDto,
  ): Promise<ResponseDefault> {
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
      delete registerAdministradorDto.senha
      const administrador = await this.serv.create(registerAdministradorDto)
      return {
        error_id: TipoErro.SEM_ERROS,
        message: 'Sucesso!',
        error: false,
        data: {
          administrador,
        },
      }
    } catch (error) {
      this.auth.deleteUser(user.uid)
      throw error
    }
  }
}
