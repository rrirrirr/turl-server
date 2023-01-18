import { Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Team } from './entities/team.entity'

@Injectable()
export class TeamsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateTeamDto): Promise<Team[] | undefined> {
    const tournaments = await this.knex.table('teams').where(queries)
    return tournaments
  }

  async create(createTeamDto: CreateTeamDto) {
    const result = await this.knex.table('teams').insert(createTeamDto, ['id'])
    return result
  }

  async findOne(id: string): Promise<Team | undefined> {
    const team = await this.knex.table('teams').select().where({ id: id })
    return team[0]
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.knex
      .table('teams')
      .where({ id: id })
      .update(updateTeamDto, ['id'])
    return team
  }

  async remove(id: string) {
    const res = await this.knex.table('teams').where({ id: id }).del()
    return res
  }
}
