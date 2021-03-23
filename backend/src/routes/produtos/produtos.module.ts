import { Module } from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { ProdutosController } from './produtos.controller'
import { ProdutosEntityModule } from 'src/models/produto/produto.module'

@Module({
  imports: [ProdutosEntityModule],
  providers: [ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}
