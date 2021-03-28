import 'reflect-metadata'
import {
  HOST_BD,
  NAME_BD,
  PASSWORD_BD,
  PORT_BD,
  USER_BD,
} from 'src/config/config'
import { createConnection, Connection, getConnection } from 'typeorm'
import * as path from 'path'
export class PostgresDatabase {
  private _connection?: Connection

  private static _instance: PostgresDatabase

  private constructor() {
    this.startConnection()
  }

  /** Atributo estático que referencia a própria classe */
  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  /** Inicia a conexão no banco de dados */
  public async startConnection() {
    if (!this._connection) {
      let attempts = 0
      while (attempts <= 3) {
        try {
          this._connection = await createConnection({
            type: 'postgres',
            host: HOST_BD,
            port: PORT_BD,
            username: USER_BD,
            password: PASSWORD_BD,
            database: NAME_BD,
            synchronize: false,
            entities: [
              path.join(__dirname, '..', '..', 'models', '**', '*.entity.ts'),
            ],
          })
          break
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          attempts++
        }
      }
      if (attempts >= 3) {
        throw new Error('Excedeu o numero de tentativas para se conectar ao BD')
      }
    }
  }

  /** Pega a conexão com o BD, caso passe um nome pega a conexão pelo nome. Se não, retorna a conexão padrão
   * @param name valor opcional para pegar a conexão pelo nome
   */
  public getConnection(name?: string): Connection {
    if (!name && this._connection) {
      return this._connection
    }
    return getConnection(name)
  }
}
