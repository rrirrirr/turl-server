import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectConnection } from 'nest-knexjs'
import { CreateFormatDto } from './dto/create-format.dto'
import { UpdateFormatDto } from './dto/update-format.dto'

@Injectable()
export class FormatsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll() {
    const formats = await this.knex.table('formats')
    return formats
  }

  async create(createFormatDto: CreateFormatDto) {
    const result = await this.knex
      .table('formats')
      .insert(createFormatDto, ['name'])
    return result
  }

  async findOne(name: string) {
    const tournament = await this.knex
      .table('formats')
      .select()
      .where({ name: name })
    return tournament
  }

  async update(name: string, updateFormatDto: UpdateFormatDto) {
    return `This action updates a #${name} invite`
  }

  async remove(name: string) {
    const res = await this.knex.table('formats').where({ name: name }).del()
    return res
  }
}
