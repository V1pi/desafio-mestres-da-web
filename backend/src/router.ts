import { Router } from 'express'
import dtoValidationMiddleware from './common/middlewares/dto-validation.middleware'
import { CreateAdministradorDto } from './controllers/dto/create-administrador.dto'
import { RegistrarController } from './controllers/registrar.controller'

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
export { routes }
