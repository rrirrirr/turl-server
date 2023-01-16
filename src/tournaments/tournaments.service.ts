import { Injectable } from '@nestjs/common'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class TournamentsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateTournamentDto) {
    const tournaments = await this.knex.table('tournaments').where(queries)
    return { tournaments }
  }

  async create(createTournamentDto: CreateTournamentDto) {
    console.log(createTournamentDto)
    const result = await this.knex
      .table('tournaments')
      .insert(createTournamentDto, ['id'])
    return result
  }

  async findOne(id: number) {
    const tournament = await this.knex
      .table('tournaments')
      .select()
      .where({ id: id })
    return tournament
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`
  }

  async remove(id: number) {
    const res = await this.knex.table('tournaments').where({ id: id }).del()
    return res
  }
}
