import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIG } from './common/constants/firebase'

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(FIREBASE_CONFIG),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
