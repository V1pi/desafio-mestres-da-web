import { Router } from 'express'
import { TipoUsuario } from './common/enums/tipo-usuario.enum'
import dtoValidationMiddleware from './common/middlewares/dto-validation.middleware'
import { guardMiddleware } from './common/middlewares/guard.middeware'
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
    try {
      await registrarController.create(req, res)
    } catch (error) {
      next(error)
    }
  },
)

routes.post(
  '/produtos/novo',
  guardMiddleware([TipoUsuario.ADMIN]),
  dtoValidationMiddleware(CreateProdutoDto),
  async (req, res, next) => {
    try {
      const produtoController = new ProdutoController()
      await produtoController.new(req, res)
    } catch (error) {
      next(error)
    }
  },
)

routes.put(
  '/produtos/:id/alterar',
  guardMiddleware([TipoUsuario.ADMIN]),
  dtoValidationMiddleware(UpdateProdutoDto),
  async (req, res, next) => {
    try {
      const produtoController = new ProdutoController()
      await produtoController.updateProduto(req, res)
    } catch (error) {
      next(error)
    }
  },
)

routes.delete(
  '/produtos/:id',
  guardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    try {
      const produtoController = new ProdutoController()
      await produtoController.deleteProduto(req, res)
    } catch (error) {
      next(error)
    }
  },
)

routes.get(
  '/produtos/:id/info',
  guardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    try {
      const produtoController = new ProdutoController()
      await produtoController.getById(req, res)
    } catch (error) {
      next(error)
    }
  },
)

routes.get(
  '/produtos',
  guardMiddleware([TipoUsuario.ADMIN]),
  async (req, res, next) => {
    try {
      const produtoController = new ProdutoController()
      await produtoController.getAllProdutos(req, res)
    } catch (error) {
      next(error)
    }
  },
)
export { routes }
