import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { Tournament } from './entities/tournament.entity'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { AuthUser } from 'src/auth/authUser.entity'
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@mikro-orm/nestjs'
import { MikroORM, wrap } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    @InjectRepository(TournamentAdmin)
    private readonly tournamentRepository: EntityRepository<Tournament>,
    private readonly tournamentAdminRepository: EntityRepository<TournamentAdmin>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  async findAll(queries: CreateTournamentDto): Promise<Tournament[]> {
    const tournaments = await this.tournamentRepository.find(queries, {
      populate: false,
    })
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
      const admin = {
        user: user.userId,
        tournament: tournament.id,
      }

      const tournamentAdmin = new TournamentAdmin()
      wrap(tournamentAdmin).assign(admin, { em: this.orm.em })
      await this.em.persistAndFlush(tournamentAdmin)
    }
    return tournament
  }

  async findOne(id: string): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne(
      { id: id },
      {
        populate: [
          'invites',
          'games',
          'teams',
          'games.teams',
          'tournamentAdmins',
        ],
      }
    )
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
    console.log('find t')
    const tournament = await this.tournamentRepository.findOne(id)

    if (!tournament) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    wrap(tournament).assign(updateTournamentDto)
    await this.tournamentRepository.persistAndFlush(tournament)

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
    // const permission = adminRights.find((right) => right.user === user.userId)
    return true
    // return permission
  }
}
