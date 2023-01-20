import { Module } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { TeamsController } from './teams.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { Team } from './entities/team.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Team] })],
  controllers: [TeamsController],
  providers: [TeamsService, CaslAbilityFactory],
})
export class TeamsModule {}
