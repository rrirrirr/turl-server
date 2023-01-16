import { Injectable } from '@nestjs/common'
import { CreateVenueDto } from './dto/create-venue.dto'
import { UpdateVenueDto } from './dto/update-venue.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class VenuesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    const venues = await this.knex.table('venues')
    return venues
  }

  async create(createInviteDto: CreateVenueDto) {
    const result = await this.knex
      .table('venues')
      .insert(CreateVenueDto, ['name'])
    return result
  }

  async findOne(name: string) {
    const tournament = await this.knex
      .table('venues')
      .select()
      .where({ name: name })
    return tournament
  }

  async update(name: string, updateInviteDto: UpdateVenueDto) {
    return `This action updates a #${name} invite`
  }

  async remove(name: string) {
    const res = await this.knex.table('venues').where({ name: name }).del()
    return res
  }
}
