import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentAdminDto } from './create-tournament_admin.dto';

export class UpdateTournamentAdminDto extends PartialType(CreateTournamentAdminDto) {}
