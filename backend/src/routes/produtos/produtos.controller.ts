import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { ResponseDefault } from '../../common/interfaces/response-default.interface'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { TipoUsuario } from '../../common/enums/tipo-usuario.enum'

@Controller('produtos')
export class ProdutosController {
  constructor(private serv: ProdutosService) {}

  @Roles(TipoUsuario.ADMIN)
  @Post('novo')
  public async newProduto(
    @Body() newProduto: CreateProdutoDto,
  ): Promise<ResponseDefault> {
    const produto = await this.serv.create(newProduto)
    return {
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      error: false,
      data: {
        produto,
      },
    }
  }

  @Roles(TipoUsuario.ADMIN)
  @Get(':id/info')
  public async getById(@Param('id') id: number): Promise<ResponseDefault> {
    const produto = await this.serv.getByIdWithAllInformation(id)
    return {
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      error: false,
      data: {
        produto,
      },
    }
  }

  @Roles(TipoUsuario.ADMIN)
  @Put(':id/alterar')
  public async updateProduto(
    @Param('id') id: number,
    @Body() newProduto: UpdateProdutoDto,
  ): Promise<ResponseDefault> {
    const tempProduto = await this.serv.getByID(id)
    newProduto.id = tempProduto.id
    const produto = await this.serv.create(newProduto)
    return {
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      error: false,
      data: {
        produto,
      },
    }
  }

  @Roles(TipoUsuario.ADMIN)
  @Delete(':id')
  public async deleteProduto(
    @Param('id') id: number,
  ): Promise<ResponseDefault> {
    await this.serv.delete(id)
    return {
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      error: false,
      data: {},
    }
  }

  @Roles(TipoUsuario.ADMIN)
  @Get()
  public async getAllProdutos(): Promise<ResponseDefault> {
    const produtos = await this.serv.getAll()
    return {
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      error: false,
      data: {
        produtos,
      },
    }
  }
}
