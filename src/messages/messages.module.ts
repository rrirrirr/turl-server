import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { Message } from './entities/message.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Message] })],
  controllers: [MessagesController],
  providers: [MessagesService, CaslAbilityFactory],
})
export class MessagesModule {}
