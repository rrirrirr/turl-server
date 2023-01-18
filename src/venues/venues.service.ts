import { Injectable } from '@nestjs/common'
import { CreateVenueDto } from './dto/create-venue.dto'
import { UpdateVenueDto } from './dto/update-venue.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { Venue } from './entities/venue.entity'

@Injectable()
export class VenuesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Venue[] | undefined> {
    const venues = await this.knex.table('venues')
    return venues
  }

  async create(createInviteDto: CreateVenueDto) {
    const result = await this.knex
      .table('venues')
      .insert(CreateVenueDto, ['name'])
    return result
  }

  async findOne(name: string): Promise<Venue | undefined> {
    const venue = await this.knex.table('venues').select().where({ name: name })
    return venue[0]
  }

  async update(name: string, updateInviteDto: UpdateVenueDto) {
    const venue = await this.knex
      .table('venues')
      .where({ name: name })
      .update(UpdateVenueDto, ['name'])
    return venue
  }

  async remove(name: string) {
    const res = await this.knex.table('venues').where({ name: name }).del()
    return res
  }
}
