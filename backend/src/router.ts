import { Router } from 'express'
import { RegistrarController } from './controllers/registrar.controller'

/**
 * Gerencia as rotas
 */
const routes = Router()

routes.get('', (req, res) => res.send('Ola'))
routes.post('/registrar/administrador', async (req, res, next) => {
  const registrarController = new RegistrarController()
  next(registrarController.create(req, res))
})
export { routes }
