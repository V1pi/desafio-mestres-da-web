import express from 'express'
import cors from 'cors'
import { routes } from './router'

/**
 * Gerencia as configurações do servidor NodeJS.
 * Responsável por todos os middlewares, database e routes
 */
export class App {
  /**
   * Variável pública que faz referência ao express que será utilziado em toda
   * aplicação
   */
  public express: express.Application
  /**
   * Chama os métodos privados
   * responsáveis pelos middlewares, database e routes
   */
  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  /**
   * Define os plugins que irão ser utilizados juntamente com o express como o json e o cors
   */
  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  /**
   * Configura o arquivo de rotas
   */
  private routes(): void {
    this.express.use(routes)
  }
}
