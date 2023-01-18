import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

@Injectable()
export class MessagesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateMessageDto) {
    const messages = await this.knex.table('messages').where(queries)
    return messages
  }

  async create(CreateMessageDto: CreateMessageDto) {
    const result = await this.knex
      .table('messages')
      .insert(CreateMessageDto, ['id'])
    return result
  }

  async findOne(id: string) {
    const tournament = await this.knex
      .table('messages')
      .select()
      .where({ id: id })
    return tournament
  }

  async update(id: string, updateInviteDto: UpdateMessageDto) {
    const tournament = await this.knex
      .table('messages')
      .where({ id: id })
      .update(UpdateMessageDto, ['id'])
    return tournament
  }

  async remove(id: string) {
    const res = await this.knex.table('messages').where({ id: id }).del()
    return res
  }
}
