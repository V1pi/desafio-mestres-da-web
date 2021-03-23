import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VariacoesEntityModule } from '../variacao/variacao.module'
import { Alternativa } from './alternativa.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Alternativa]),
    forwardRef(() => VariacoesEntityModule),
  ],
  exports: [TypeOrmModule],
})
export class AlternativasEntityModule {}
