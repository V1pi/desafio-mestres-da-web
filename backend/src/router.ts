import { Router } from 'express'
import { TipoUsuario } from './common/enums/tipo-usuario.enum'
import dtoValidationMiddleware from './common/middlewares/dto-validation.middleware'
import { GuardMiddleware } from './common/middlewares/guard.middeware'
import { CreateProdutoDto } from './controllers/produtos/dto/create-produto.dto'
import { UpdateProdutoDto } from './controllers/produtos/dto/update-produto.dto'
import { ProdutoController } from './controllers/produtos/produto.controller'
import { CreateAdministradorDto } from './controllers/registrar/dto/create-administrador.dto'
import { RegistrarController } from './controllers/registrar/registrar.controller'

/**
 * Gerencia as rotas
 */
const routes = Router()

routes.get('', (req, res) => res.send('Ola'))
routes.post(
  '/registrar/administrador',
  dtoValidationMiddleware(CreateAdministradorDto),
  async (req, res, next) => {
    const registrarController = new RegistrarController()
    next(registrarController.create(req, res))
  },
)

routes.post(
  '/produtos/novo',
  GuardMiddleware([TipoUsuario.ADMIN]),
  dtoValidationMiddleware(CreateProdutoDto),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.new(req, res))
  },
)

routes.put(
  '/produtos/:id/alterar',
  GuardMiddleware([TipoUsuario.ADMIN]),
  dtoValidationMiddleware(UpdateProdutoDto),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.updateProduto(req, res))
  },
)

routes.delete(
  '/produtos/:id',
  GuardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.deleteProduto(req, res))
  },
)

routes.get(
  '/produtos/:id/info',
  GuardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.getById(req, res))
  },
)

routes.get(
  '/produtos',
  GuardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.getAllProdutos(req, res))
  },
)
export { routes }
