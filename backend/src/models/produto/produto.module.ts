import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VariacoesEntityModule } from '../variacao/variacao.module'
import { Produto } from './produto.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]),
    forwardRef(() => VariacoesEntityModule),
  ],
  exports: [TypeOrmModule],
})
export class ProdutosEntityModule {}
