import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIG } from './common/constants/firebase'
import { PgModelsConfigModule } from './config/postgressql/config.module'
import { AppConfigModule } from './config/app/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgModelsConfigService } from './config/postgressql/config.service'
import { AuthMiddleware } from './common/middlewares/auth.middleware'
import { RegistrarModule } from './routes/registrar/registrar.module'

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
    RegistrarModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('registrar')
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
