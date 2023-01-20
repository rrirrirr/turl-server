import { Module } from '@nestjs/common'
import { GameTypesService } from './game_types.service'
import { GameTypesController } from './game_types.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { GameType } from './entities/game_type.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [GameType] })],
  controllers: [GameTypesController],
  providers: [GameTypesService, CaslAbilityFactory],
})
export class GameTypesModule {}
