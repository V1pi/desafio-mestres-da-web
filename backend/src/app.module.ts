import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common'
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { FIREBASE_CONFIG } from './common/constants/firebase'
import { PgModelsConfigModule } from './config/postgressql/config.module'
import { AppConfigModule } from './config/app/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgModelsConfigService } from './config/postgressql/config.service'
import { AuthMiddleware } from './common/middlewares/auth.middleware'
import { RegistrarModule } from './routes/registrar/registrar.module'
import { ProdutosModule } from './routes/produtos/produtos.module'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter'
import { RolesGuard } from './common/guards/roles.guard'

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
    ProdutosModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
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
