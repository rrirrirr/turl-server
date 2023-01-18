import { Injectable } from '@nestjs/common'
import { CreateGameDto } from './dto/create-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Game } from './entities/game.entity'

@Injectable()
export class GamesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateGameDto): Promise<Game[] | undefined> {
    const games = await this.knex.table('games').where(queries)
    return games
  }

  async create(createTeamDto: CreateGameDto) {
    const result = await this.knex.table('games').insert(createTeamDto, ['id'])
    return result
  }

  async findOne(id: string): Promise<Game | undefined> {
    const game = await this.knex.table('games').select().where({ id: id })
    return game[0]
  }

  async update(id: string, upadateGameDto: UpdateGameDto) {
    const tournament = await this.knex
      .table('games')
      .where({ id: id })
      .update(upadateGameDto, ['id'])
    return tournament
  }

  async remove(id: string) {
    const res = await this.knex.table('games').where({ id: id }).del()
    return res
  }
}
