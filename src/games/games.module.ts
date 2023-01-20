import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesController } from './games.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Game } from './entities/game.entity'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Game] })],
  controllers: [GamesController],
  providers: [GamesService, CaslAbilityFactory],
})
export class GamesModule {}
