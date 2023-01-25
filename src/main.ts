import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { MikroORM } from '@mikro-orm/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase()
  await app.get(MikroORM).getSchemaGenerator().updateSchema()
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableShutdownHooks()
  await app.listen(5001)
}
bootstrap()
