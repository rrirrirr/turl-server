import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Tournament } from './entities/tournament.entity'
import { User } from 'src/users/entities/user.entity'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { ForbiddenError } from '@casl/ability'
import { Action } from 'src/abilities/action.enum'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { AuthUser } from 'src/auth/authUser.entity'
import { v4 as uuid } from 'uuid'

@Injectable()
export class TournamentsService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly tournamentAdminsService: TournamentAdminsService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async findAll(queries: CreateTournamentDto) {
    const tournaments = await this.knex.table('tournaments').where(queries)
    return { tournaments }
  }

  async create(
    createTournamentDto: CreateTournamentDto,
    user: AuthUser
  ): Promise<Tournament | undefined> {
    const tournament = await (<Promise<Tournament[] | undefined>>(
      this.knex
        .table('tournaments')
        .insert({ ...createTournamentDto, id: uuid() }, ['id'])
    ))
    if (tournament.length) {
      const adminDto = {
        user_id: user.userId,
        tournament_id: tournament[0].id,
      }
      const adminRight = this.tournamentAdminsService.create({
        id: uuid(),
        user_id: user.userId,
        tournament_id: tournament[0].id,
      })
    }

    return tournament[0]
  }

  async findOne(id: number) {
    const tournament = await this.knex
      .table('tournaments')
      .select()
      .where({ id: id })
    return tournament
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
    user: AuthUser
  ) {
    const adminRights = await this.tournamentAdminsService.findByTournamentId(
      id
    )
    const permission = adminRights.find(
      (right) => right.user_id === user.userId
    )
    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }
    const tournament = await this.knex
      .table('tournaments')
      .where({ id: id })
      .update(updateTournamentDto, ['id'])
    return tournament
  }

  async remove(id: string, user: AuthUser) {
    const adminRights = await this.tournamentAdminsService.findByTournamentId(
      id
    )
    const permission = adminRights.find(
      (right) => right.user_id === user.userId
    )
    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const res = await this.knex.table('tournaments').where({ id: id }).del()
    return res
  }
}
