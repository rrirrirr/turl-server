import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { v4 as uuid } from 'uuid'
import { User } from './entities/user.entity'
import { AuthUser } from 'src/auth/authUser.entity'

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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: AuthUser
  ) {
    const permission = currentUser.userId === id

    if (!permission && !currentUser.isAdmin) {
      throw new ForbiddenException('No permission')
    }

    const user = await this.knex
      .table('users')
      .where({ id: id })
      .update(updateUserDto, ['id'])
    return user
  }

  async remove(id: string) {
    const res = await this.knex.table('users').where({ id: id }).del()
    return res
  }
}
