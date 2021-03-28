import { App } from './app'
import * as fs from 'fs'
import * as path from 'path'
import * as admin from 'firebase-admin'

import { WEBSERVICE_PORT, WEBSERVICE_HOST } from './config/config'
import { PostgresDatabase } from './common/databases/postgres.database'
async function main(): Promise<void> {
  const app = new App()
  /** Pega o arquivo referente as chaves do firebase */
  const file = fs.readFileSync(
    path.join(__dirname, '/config/admin-firebase.json'),
    'utf8',
  )
  /** Inicializa o firebase com as chaves de administrador */
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(file)),
  })

  /**
   * Pega a porta do servidor que foi definida pelo sistema ou utiliza a padrão 2107
   */
  /**
   * Coloca o servidor para ouvir a porta selecionada
   */
  await PostgresDatabase.Instance.startConnection()
  app.express.listen(WEBSERVICE_PORT, WEBSERVICE_HOST)
  console.log('SERVIDOR RODANDO PORTA: ' + WEBSERVICE_PORT)
}

main()
