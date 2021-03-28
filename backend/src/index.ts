import { App } from './app'
import * as admin from 'firebase-admin'

import { WEBSERVICE_PORT, WEBSERVICE_HOST } from './config/config'
import { PostgresDatabase } from './common/databases/postgres.database'
import { FIREBASE_CONFIG } from './common/constants/firebase'
async function main(): Promise<void> {
  const app = new App()
  /** Inicializa o firebase com as chaves de administrador */
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG),
  })
  /**
   * Coloca o servidor para ouvir a porta selecionada
   */
  await PostgresDatabase.Instance.startConnection()
  app.express.listen(WEBSERVICE_PORT, WEBSERVICE_HOST)
  console.log('SERVIDOR RODANDO PORTA: ' + WEBSERVICE_PORT)
}

main()
