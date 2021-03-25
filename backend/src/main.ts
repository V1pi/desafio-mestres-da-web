import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const appConfig: AppConfigService = app.get('AppConfigService')
  await app.listen(appConfig.port, appConfig.host)
}
bootstrap()
