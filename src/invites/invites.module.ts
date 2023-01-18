import { Module } from '@nestjs/common'
import { InvitesService } from './invites.service'
import { InvitesController } from './invites.controller'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'

@Module({
  controllers: [InvitesController],
  providers: [InvitesService, CaslAbilityFactory, TournamentAdminsService],
})
export class InvitesModule {}
