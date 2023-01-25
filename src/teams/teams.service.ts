import { wrap, MikroORM } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { QueryDto } from 'src/common/query.dto'
import { Invite } from 'src/invites/entities/invite.entity'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Team } from './entities/team.entity'

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: EntityRepository<Team>,
    private readonly em: EntityManager,
    private readonly orm: MikroORM
  ) {}

  async findAll(queries: QueryDto): Promise<Team[]> {
    const team = await this.teamRepository.findAll()
    return team
  }

  async findByCode(code: string): Promise<Team> {
    const team = await this.teamRepository.findOne(
      { team_code: code },
      {
        populate: ['tournament', 'player', 'games', 'games.teams'],
      }
    )

    if (!team) {
      throw new HttpException('Invite not found', HttpStatus.FORBIDDEN)
    }

    return team
  }

  async create(
    createTeamDto: CreateTeamDto,
    inviteCode: string | null
  ): Promise<Team> {
    const foundInvite = await this.em.findOne(Invite, { code: inviteCode })

    if (!foundInvite) {
      throw new HttpException('Invite not found', HttpStatus.FORBIDDEN)
    }

    if (foundInvite.tournament.id !== createTeamDto.tournament) {
      console.log(foundInvite.tournament.id)
      console.log(createTeamDto.tournament)
      throw new HttpException(
        'Invite not matching tournament',
        HttpStatus.FORBIDDEN
      )
    }

    if (foundInvite.used) {
      throw new HttpException('Invite already used', HttpStatus.FORBIDDEN)
    }

    const team = new Team()
    wrap(team).assign(createTeamDto, { em: this.orm.em })
    await this.teamRepository.persistAndFlush(team)

    if (foundInvite.unique) {
      foundInvite.used = true
      await this.em.upsert(foundInvite)
      await this.em.flush()
    }

    return team
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne(
      { id: id },
      { populate: ['player'] }
    )

    if (!team) {
      throw new HttpException('Invite not found', HttpStatus.FORBIDDEN)
    }

    delete team.team_code
    return team
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findOne({ id: id })
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
    }

    wrap(team).assign(updateTeamDto)
    await this.teamRepository.persistAndFlush(team)

    return team
  }

  async remove(id: string) {
    const team = await this.teamRepository.findOne({ id: id })

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
    }

    const res = this.teamRepository.removeAndFlush(team)
    return res
  }
}
