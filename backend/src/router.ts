import { Router } from 'express'
import { TipoUsuario } from './common/enums/tipo-usuario.enum'
import dtoValidationMiddleware from './common/middlewares/dto-validation.middleware'
import { GuardMiddleware } from './common/middlewares/guard.middeware'
import { ProdutoController } from './controllers/produtos/produto.controller'
import { CreateAdministradorDto } from './controllers/registrar/dto/create-administrador.dto'
import { RegistrarController } from './controllers/registrar/registrar.controller'
import { CreateProdutoDto } from './routes/produtos/dto/create-produto.dto'
import { UpdateProdutoDto } from './routes/produtos/dto/update-produto.dto'

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
  '/produtos/:id/alternar',
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

routes.delete(
  '/produtos/:id/info',
  GuardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    const produtoController = new ProdutoController()
    next(produtoController.getById(req, res))
  },
)
export { routes }
