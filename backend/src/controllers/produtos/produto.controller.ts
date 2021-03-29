import { TipoErro } from '../../common/enums/tipo-erro.enum'
import { Request, Response } from 'express'
import { ResponseDefault } from '../../common/interfaces/response-default.interface'
import { Produto } from '../../models/produto/produto.entity'
import { ProdutoRepository } from '../../repositories/produtos/produto.repository'
export class ProdutoController {
  private repo: ProdutoRepository

  constructor() {
    this.repo = new ProdutoRepository()
  }
  public async new(req: Request, res: Response): Promise<Response> {
    const newProduto = await this.repo.create(Produto.fromJson(req.body))
    return res.status(201).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {
        produto: newProduto,
      },
    } as ResponseDefault)
  }
  public async getById(req: Request, res: Response): Promise<Response> {
    const produto = await this.repo.getByIdWithAllInformation(
      Number(req.params.id),
    )
    return res.status(200).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {
        produto: produto,
      },
    } as ResponseDefault)
  }

  public async updateProduto(req: Request, res: Response): Promise<Response> {
    const newProduto = Produto.fromJson(req.body)

    const oldProduto = await this.repo.getByIdWithAllInformation(
      Number(req.params.id),
    )
    newProduto.id = oldProduto.id
    const produto = await this.repo.updateProduto(
      oldProduto,
      newProduto as Produto,
    )
    return res.status(201).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {
        produto: produto,
      },
    } as ResponseDefault)
  }

  public async deleteProduto(req: Request, res: Response): Promise<Response> {
    await this.repo.delete(Number(req.params.id))
    return res.status(200).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {},
    } as ResponseDefault)
  }

  public async getAllProdutos(req: Request, res: Response): Promise<Response> {
    const produtos = await this.repo.getAll()
    return res.status(200).json({
      error: false,
      error_id: TipoErro.SEM_ERROS,
      message: 'Sucesso!',
      data: {
        produtos,
      },
    } as ResponseDefault)
  }
}
