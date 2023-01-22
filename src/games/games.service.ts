import { wrap, MikroORM } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateGameDto } from './dto/create-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { Game } from './entities/game.entity'

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: EntityRepository<Game>,
    private readonly orm: MikroORM
  ) {}

  async findAll(queries: any): Promise<Game[]> {
    const game = await this.gameRepository.find(queries, {
      populate: ['teams'],
    })
    return game
  }

  async create(createGameDto: CreateGameDto) {
    console.log(createGameDto)
    const game = new Game()
    wrap(game).assign(createGameDto, { em: this.orm.em })
    await this.gameRepository.persistAndFlush(game)
    return game
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(
      { id: id },
      { populate: ['tournament', 'teams'] }
    )
    return game
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepository.findOne({ id: id })

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND)
    }

    wrap(game).assign(updateGameDto)
    await this.gameRepository.persistAndFlush(game)

    return game
  }

  async remove(id: string) {
    const game = await this.gameRepository.findOne({ id: id })

    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND)
    }

    const res = this.gameRepository.removeAndFlush(game)
    return res
  }
}
