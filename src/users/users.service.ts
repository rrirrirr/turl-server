import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'

//////FIXXXXX!!!!
export type User = any

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: CreateUserDto) {
    const tournaments = await this.knex.table('users').where(queries)
    return tournaments
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.knex.table('users').insert(createUserDto, ['id'])
    return result
  }

  async findOne(email: string): Promise<User | undefined> {
    const tournament = await this.knex
      .table('users')
      .select()
      .where({ email: email })
    return tournament
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} team`
  }

  async remove(id: number) {
    const res = await this.knex.table('users').where({ id: id }).del()
    return res
  }
}
