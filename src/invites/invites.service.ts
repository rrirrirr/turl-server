import { Injectable } from '@nestjs/common'
import { CreateInviteDto } from './dto/create-invite.dto'
import { UpdateInviteDto } from './dto/update-invite.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class InvitesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateInviteDto) {
    const invites = await this.knex.table('invites').where(queries)
    return invites
  }

  async create(createInviteDto: CreateInviteDto) {
    const result = await this.knex
      .table('invites')
      .insert(createInviteDto, ['id'])
    return result
  }

  async findOne(id: number) {
    const tournament = await this.knex
      .table('invites')
      .select()
      .where({ id: id })
    return tournament
  }

  async update(id: number, updateInviteDto: UpdateInviteDto) {
    return `This action updates a #${id} invite`
  }

  async remove(id: number) {
    const res = await this.knex.table('invites').where({ id: id }).del()
    return res
  }
}
