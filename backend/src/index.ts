import * as admin from 'firebase-admin'

import { WEBSERVICE_PORT, WEBSERVICE_HOST } from './config/config'
import { PostgresDatabase } from './common/databases/postgres.database'
import { FIREBASE_CONFIG } from './common/constants/firebase'
import { App } from './app'

async function main(): Promise<void> {
  /** Inicializa o firebase com as chaves de administrador */
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG),
  })

  await PostgresDatabase.Instance.startConnection()

  const app = new App()
  /**
   * Coloca o servidor para ouvir a porta selecionada
   */
  app.express.listen(WEBSERVICE_PORT, WEBSERVICE_HOST)
  console.log('SERVIDOR RODANDO PORTA: ' + WEBSERVICE_PORT)
}

main()
