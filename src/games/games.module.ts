import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesController } from './games.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'

@Module({
  controllers: [GamesController],
  providers: [GamesService, CaslAbilityFactory],
})
export class GamesModule {}
