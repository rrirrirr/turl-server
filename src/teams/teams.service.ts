import { wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Team } from './entities/team.entity'

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: EntityRepository<Team>
  ) {}

  async findAll(queries: CreateTeamDto): Promise<Team[]> {
    const team = await this.teamRepository.findAll()
    return team
  }

  async create(createTeamDto: CreateTeamDto) {
    const team = new Team()
    wrap(team).assign(createTeamDto)
    await this.teamRepository.persistAndFlush(team)
    return team
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ id: id })
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
