import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Tournament } from './entities/tournament.entity'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { AuthUser } from 'src/auth/authUser.entity'
import { v4 as uuid } from 'uuid'

@Injectable()
export class TournamentsService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  async findAll(
    queries: CreateTournamentDto
  ): Promise<Tournament[] | undefined> {
    const tournaments = await this.knex.table('tournaments').where(queries)
    return tournaments
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
      const adminRight = await this.tournamentAdminsService.create({
        id: uuid(),
        user_id: user.userId,
        tournament_id: tournament[0].id,
      })
    }
    return tournament[0]
  }

  async findOne(id: number): Promise<Tournament | undefined> {
    const tournament = await this.knex
      .table('tournaments')
      .select()
      .where({ id: id })
    return tournament[0]
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
    user: AuthUser
  ) {
    const permission = this.getPermission(id, user)

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
    const permission = this.getPermission(id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const res = await this.knex.table('tournaments').where({ id: id }).del()
    return res
  }

  private async getPermission(tournamentId: string, user: AuthUser) {
    const adminRights = await this.tournamentAdminsService.findByTournamentId(
      tournamentId
    )
    const permission = adminRights.find(
      (right) => right.user_id === user.userId
    )
    return permission
  }
}
