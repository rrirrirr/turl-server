import { Module } from '@nestjs/common'
import { InvitesService } from './invites.service'
import { InvitesController } from './invites.controller'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { Invite } from './entities/invite.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { SqlEntityRepository } from '@mikro-orm/sqlite'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Invite, TournamentAdmin] })],
  controllers: [InvitesController],
  providers: [
    InvitesService,
    CaslAbilityFactory,
    TournamentAdminsService,
    SqlEntityRepository,
  ],
})
export class InvitesModule {}
