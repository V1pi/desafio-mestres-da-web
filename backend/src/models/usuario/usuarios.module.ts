import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from './usuario.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
  ],
  exports: [TypeOrmModule],
})
export class UsuariosEntityModule { }
