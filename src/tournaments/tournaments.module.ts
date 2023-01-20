import { Module } from '@nestjs/common'
import { TournamentsService } from './tournaments.service'
import { TournamentsController } from './tournaments.controller'
import { TournamentAdminsService } from '../tournament_admins/tournament_admins.service'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Tournament } from './entities/tournament.entity'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Tournament, TournamentAdmin] }),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, CaslAbilityFactory, TournamentAdminsService],
})
export class TournamentsModule {}
