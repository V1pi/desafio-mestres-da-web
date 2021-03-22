import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIG } from './common/constants/firebase'
import { PgModelsConfigModule } from './config/postgressql/config.module'
import { AppConfigModule } from './config/app/config.module'

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(FIREBASE_CONFIG),
      }),
    }),
    PgModelsConfigModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
