import dotenv from 'dotenv'
dotenv.config()
/**
 * @ignore
 */
const senhaBd = process.env.POSTGRES_PASSWORD
const nameBd = process.env.POSTGRES_DB
const hostBd = process.env.POSTGRES_HOST
const webServicePort = process.env.PORT
const webServiceHost = process.env.HOST
const userBd = process.env.POSTGRES_USER
const portBD = process.env.POSTGRES_PORT

/**
 * Constante que armazena a senha do banco de dados de acordo com o tipo com o mode de operação
 * development, test e production
 */
const PASSWORD_BD: string = senhaBd || ''
const NAME_BD: string = nameBd || ''
const HOST_BD: string = hostBd || ''
const WEBSERVICE_HOST: string = webServiceHost || ''
const WEBSERVICE_PORT: number = Number(webServicePort) || 2503
const USER_BD: string = userBd || ''
const PORT_BD: number = Number(portBD) || 5432
export {
  USER_BD,
  PASSWORD_BD,
  NAME_BD,
  HOST_BD,
  WEBSERVICE_PORT,
  WEBSERVICE_HOST,
  PORT_BD,
}
