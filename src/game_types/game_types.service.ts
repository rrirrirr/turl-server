import { Injectable } from '@nestjs/common'
import { CreateGameTypeDto } from './dto/create-game_type.dto'
import { UpdateGameTypeDto } from './dto/update-game_type.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class GameTypesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    const game_types = await this.knex.table('game_types')
    return game_types
  }

  async create(createInviteDto: CreateGameTypeDto) {
    const result = await this.knex
      .table('game_types')
      .insert(CreateGameTypeDto, ['name'])
    return result
  }

  async findOne(name: string) {
    const tournament = await this.knex
      .table('game_types')
      .select()
      .where({ name: name })
    return tournament
  }

  async update(name: string, updateInviteDto: UpdateGameTypeDto) {
    return `This action updates a #${name} invite`
  }

  async remove(name: string) {
    const res = await this.knex.table('game_types').where({ name: name }).del()
    return res
  }
}
