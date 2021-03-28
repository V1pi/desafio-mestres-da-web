import { Router } from 'express'

/**
 * Gerencia as rotas
 */
const routes = Router()

routes.get('', (req, res) => res.send('Ola'))

export { routes }
