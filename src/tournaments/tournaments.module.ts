import { Module } from '@nestjs/common'
import { TournamentsService } from './tournaments.service'
import { TournamentsController } from './tournaments.controller'
import { TournamentAdminsService } from '../tournament_admins/tournament_admins.service'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, CaslAbilityFactory, TournamentAdminsService],
})
export class TournamentsModule {}
