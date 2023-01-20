import { Module } from '@nestjs/common'
import { TournamentAdminsService } from './tournament_admins.service'
import { TournamentAdminsController } from './tournament_admins.controller'
import { TournamentAdmin } from './entities/tournament_admin.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [TournamentAdmin] })],
  controllers: [TournamentAdminsController],
  providers: [TournamentAdminsService],
})
export class TournamentAdminsModule {}
