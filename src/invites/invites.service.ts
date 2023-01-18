import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateInviteDto } from './dto/create-invite.dto'
import { UpdateInviteDto } from './dto/update-invite.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { AuthUser } from 'src/auth/authUser.entity'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { Invite } from './entities/invite.entity'

@Injectable()
export class InvitesService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  async findAll(queries: CreateInviteDto): Promise<Invite[] | undefined> {
    const invites = await this.knex.table('invites').where(queries)
    return invites
  }

  async create(createInviteDto: CreateInviteDto, user: AuthUser) {
    const permission = this.getPermission(createInviteDto.tournament_id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const result = await this.knex
      .table('invites')
      .insert(createInviteDto, ['id'])
    return result
  }

  async findOne(id: string): Promise<Invite | undefined> {
    const invite = await this.knex.table('invites').select().where({ id: id })
    return invite[0]
  }

  async update(id: string, updateInviteDto: UpdateInviteDto, user: AuthUser) {
    const permission = this.getPermission(id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const invite = await this.knex
      .table('invites')
      .where({ id: id })
      .update(updateInviteDto, ['id'])
    return invite
  }

  async remove(id: string, user: AuthUser) {
    const permission = this.getPermission(id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const res = await this.knex.table('invites').where({ id: id }).del()
    return res
  }

  private async getPermission(
    inviteId: string,
    user: AuthUser
  ): Promise<TournamentAdmin | undefined> {
    const tournament: { id: string } | undefined = await this.knex('invites')
      .join('tournaments', 'tournament.id', 'invites.tournament_id')
      .where({ id: inviteId })
      .select('tournament.id')

    console.log(tournament)
    const adminRights = await this.tournamentAdminsService.findByTournamentId(
      tournament.id
    )
    const permission = adminRights.find(
      (right) => right.user_id === user.userId
    )
    return permission
  }
}
