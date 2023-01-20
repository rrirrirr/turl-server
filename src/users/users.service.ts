import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectConnection } from 'nest-knexjs'
import { v4 as uuid } from 'uuid'
import { User } from './entities/user.entity'
import { AuthUser } from 'src/auth/authUser.entity'

import { MikroORM, wrap } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite'
import { InjectRepository } from '@mikro-orm/nestjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async findAll(queries: any) {
    const users = await this.userRepository.findAll()
    return users
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User()
    wrap(user).assign(createUserDto)
    await this.userRepository.persistAndFlush(user)
    return user
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email: email })
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: AuthUser
  ) {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    wrap(user).assign(updateUserDto)
    await this.userRepository.persistAndFlush(user)

    return user
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const res = this.userRepository.removeAndFlush(user)
    return res
  }
}
