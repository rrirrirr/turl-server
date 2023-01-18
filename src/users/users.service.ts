import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { v4 as uuid } from 'uuid'

//////FIXXXXX!!!!
export type User = any

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(queries: any) {
    const users = await this.knex.table('users').where(queries)
    return users
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.knex
      .table('users')
      .insert({ ...createUserDto, id: uuid() }, ['id'])
    return result
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.knex.table('users').select().where({ email: email })
    return user[0]
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} team`
  }

  async remove(id: number) {
    const res = await this.knex.table('users').where({ id: id }).del()
    return res
  }
}
