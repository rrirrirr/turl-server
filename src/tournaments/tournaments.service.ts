import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Tournament } from './entities/tournament.entity'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { AuthUser } from 'src/auth/authUser.entity'
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@mikro-orm/nestjs'
import { MikroORM, wrap } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: EntityRepository<Tournament>,
    private readonly orm: MikroORM,
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  async findAll(queries: CreateTournamentDto): Promise<Tournament[]> {
    const tournaments = await this.tournamentRepository.findAll()
    return tournaments
  }

  async create(
    createTournamentDto: CreateTournamentDto,
    user: AuthUser
  ): Promise<Tournament> {
    const tournament = new Tournament()
    wrap(tournament).assign(createTournamentDto, { em: this.orm.em })
    await this.tournamentRepository.persistAndFlush(tournament)

    if (tournament) {
      const adminDto = {
        user_id: user.userId,
        tournament_id: tournament[0].id,
      }
      const adminRight = await this.tournamentAdminsService.create({
        user_id: user.userId,
        tournament_id: tournament[0].id,
      })
    }
    return tournament
  }

  async findOne(id: string): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ id: id })
    return tournament
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

    const tournament = await this.tournamentRepository.findOne(id)

    if (!tournament) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    wrap(tournament).assign(updateTournamentDto)
    await this.tournamentRepository.persistAndFlush(user)

    return tournament
  }

  async remove(id: string, user: AuthUser) {
    const permission = this.getPermission(id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }
    const tournament = await this.tournamentRepository.findOne(id)

    if (!tournament) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const res = this.tournamentRepository.removeAndFlush(tournament)
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
