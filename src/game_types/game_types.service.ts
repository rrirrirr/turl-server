import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateGameTypeDto } from './dto/create-game_type.dto'
import { UpdateGameTypeDto } from './dto/update-game_type.dto'
import { InjectConnection } from 'nest-knexjs'
import { Knex } from 'knex'
import { GameType } from './entities/game_type.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { wrap } from '@mikro-orm/core'

@Injectable()
export class GameTypesService {
  constructor(
    @InjectRepository(GameType)
    private readonly gameTypeRepository: EntityRepository<GameType>
  ) {}

  async findAll(): Promise<GameType[]> {
    const gameType = await this.gameTypeRepository.findAll()
    return gameType
  }

  async create(createGameTypeDto: CreateGameTypeDto) {
    const gameType = new GameType()
    wrap(gameType).assign(createGameTypeDto)
    await this.gameTypeRepository.persistAndFlush(gameType)
    return gameType
  }

  async findOne(name: string): Promise<GameType> {
    const gameType = await this.gameTypeRepository.findOne({ name: name })
    return gameType
  }

  async update(name: string, updateGameTypeDto: UpdateGameTypeDto) {
    const gameType = await this.gameTypeRepository.findOne({ name: name })

    if (!gameType) {
      throw new HttpException('Game type not found', HttpStatus.NOT_FOUND)
    }

    wrap(gameType).assign(updateGameTypeDto)
    await this.gameTypeRepository.persistAndFlush(gameType)

    return gameType
  }

  async remove(name: string) {
    const gameType = await this.gameTypeRepository.findOne({ name: name })

    if (!gameType) {
      throw new HttpException('Game type not found', HttpStatus.NOT_FOUND)
    }

    const res = this.gameTypeRepository.removeAndFlush(gameType)
    return res
  }
}
