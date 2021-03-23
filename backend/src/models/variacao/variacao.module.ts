import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlternativasEntityModule } from '../alternativa/alternativa.module'
import { ProdutosEntityModule } from '../produto/produto.module'
import { Variacao } from './variacao.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Variacao]),
    forwardRef(() => ProdutosEntityModule),
    forwardRef(() => AlternativasEntityModule),
  ],
  exports: [TypeOrmModule],
})
export class VariacoesEntityModule {}
