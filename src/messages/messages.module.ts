import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, CaslAbilityFactory],
})
export class MessagesModule {}
