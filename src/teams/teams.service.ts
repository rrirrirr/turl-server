import { Injectable } from '@nestjs/common'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class TeamsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateTeamDto) {
    const tournaments = await this.knex.table('teams').where(queries)
    return tournaments
  }

  async create(createTeamDto: CreateTeamDto) {
    const result = await this.knex.table('teams').insert(createTeamDto, ['id'])
    return result
  }

  async findOne(id: number) {
    const tournament = await this.knex.table('teams').select().where({ id: id })
    return tournament
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`
  }

  async remove(id: number) {
    const res = await this.knex.table('teams').where({ id: id }).del()
    return res
  }
}
