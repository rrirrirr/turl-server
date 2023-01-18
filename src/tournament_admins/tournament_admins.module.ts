import { Module } from '@nestjs/common';
import { TournamentAdminsService } from './tournament_admins.service';
import { TournamentAdminsController } from './tournament_admins.controller';

@Module({
  controllers: [TournamentAdminsController],
  providers: [TournamentAdminsService]
})
export class TournamentAdminsModule {}
