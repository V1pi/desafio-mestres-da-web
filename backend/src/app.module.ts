import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIG } from './common/constants/firebase'
import { PgModelsConfigModule } from './config/postgressql/config.module'
import { AppConfigModule } from './config/app/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgModelsConfigService } from './config/postgressql/config.service'

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(FIREBASE_CONFIG),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [PgModelsConfigModule],
      inject: [PgModelsConfigService],
      useFactory: async (configService: PgModelsConfigService) =>
        configService.getTypeORMConfig,
    }),
    PgModelsConfigModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
