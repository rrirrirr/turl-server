import { Injectable } from '@nestjs/common'
import { CreateGameDto } from './dto/create-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class GamesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateGameDto) {
    const tournaments = await this.knex.table('games').where(queries)
    return tournaments
  }

  async create(createTeamDto: CreateGameDto) {
    const result = await this.knex.table('games').insert(createTeamDto, ['id'])
    return result
  }

  async findOne(id: number) {
    const tournament = await this.knex.table('games').select().where({ id: id })
    return tournament
  }

  async update(id: number, updateTeamDto: UpdateGameDto) {
    return `This action updates a #${id} team`
  }

  async remove(id: number) {
    const res = await this.knex.table('games').where({ id: id }).del()
    return res
  }
}
