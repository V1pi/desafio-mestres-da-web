import { Module } from '@nestjs/common'
import { RegistrarService } from './registrar.service'
import { RegistrarController } from './registrar.controller'
import { UsuariosEntityModule } from 'src/models/usuario/usuarios.module'

@Module({
  imports: [UsuariosEntityModule],
  providers: [RegistrarService],
  controllers: [RegistrarController],
})
export class RegistrarModule {}
