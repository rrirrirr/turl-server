import { Module } from '@nestjs/common'
import { PlayerService } from './player.service'
import { PlayerController } from './player.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Player } from './entities/player.entity'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Player] })],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
