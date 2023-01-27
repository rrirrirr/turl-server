import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateInviteDto } from './dto/create-invite.dto'
import { UpdateInviteDto } from './dto/update-invite.dto'
import { InjectConnection } from 'nest-knexjs'
import { AuthUser } from 'src/auth/authUser.entity'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { TournamentAdmin } from 'src/tournament_admins/entities/tournament_admin.entity'
import { Invite } from './entities/invite.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { wrap, MikroORM } from '@mikro-orm/core'
import { QueryDto } from 'src/common/query.dto'

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: EntityRepository<Invite>,
    private readonly orm: MikroORM,
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  async findAll(queries: QueryDto): Promise<Invite[]> {
    const invite = await this.inviteRepository.find(
      { ...queries },
      {
        populate: ['tournament'],
      }
    )
    return invite
  }

  async create(createInviteDto: CreateInviteDto, user: AuthUser) {
    // const permission = this.getPermission(createInviteDto.tournament, user)

    // if (!permission && !user.isAdmin) {
    //   throw new ForbiddenException('No permission')
    // }
    const invite = new Invite()
    wrap(invite).assign(createInviteDto, { em: this.orm.em })
    await this.inviteRepository.persistAndFlush(invite)
    return invite
  }

  async findOne(id: string): Promise<Invite> {
    const invite = await this.inviteRepository.findOne({ id: id })
    return invite
  }

  async update(id: string, updateInviteDto: UpdateInviteDto, user: AuthUser) {
    const invite = await this.inviteRepository.findOne({ id: id })

    if (!invite) {
      throw new HttpException('Invite not found', HttpStatus.NOT_FOUND)
    }

    const permission = this.getPermission(invite.tournament.id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    wrap(invite).assign(updateInviteDto)
    await this.inviteRepository.persistAndFlush(invite)

    return invite
  }

  async remove(id: string, user: AuthUser) {
    const invite = await this.inviteRepository.findOne({ id: id })
    console.log('find it')

    if (!invite) {
      throw new HttpException('Invite not found', HttpStatus.NOT_FOUND)
    }

    const permission = this.getPermission(invite.tournament.id, user)

    if (!permission && !user.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const res = this.inviteRepository.removeAndFlush(invite)
    return res
  }

  private async getPermission(
    tournamentId: string,
    user: AuthUser
  ): Promise<boolean> {
    const adminRights = await this.tournamentAdminsService.findByTournamentId(
      tournamentId
    )
    console.log(adminRights)
    // const permission = adminRights.find((right) => right.user.find(() === user.userId))
    return true
    // return permission
  }
}
