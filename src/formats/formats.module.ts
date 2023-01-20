import { Module } from '@nestjs/common'
import { FormatsService } from './formats.service'
import { FormatsController } from './formats.controller'
import { Format } from './entities/format.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Format] })],
  controllers: [FormatsController],
  providers: [FormatsService],
})
export class FormatsModule {}
