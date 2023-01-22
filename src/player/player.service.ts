import { wrap, MikroORM } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { Player } from './entities/player.entity'

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: EntityRepository<Player>,
    private readonly orm: MikroORM
  ) {}

  async findAll(queries: CreatePlayerDto): Promise<Player[]> {
    const player = await this.playerRepository.find(queries)
    return player
  }

  async create(createTeamDto: CreatePlayerDto): Promise<Player> {
    const player = new Player()
    wrap(player).assign(createTeamDto, { em: this.orm.em })
    await this.playerRepository.persistAndFlush(player)
    return player
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ id: id })
    return player
  }

  async update(id: string, updateTeamDto: UpdatePlayerDto) {
    const player = await this.playerRepository.findOne({ id: id })

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND)
    }

    wrap(player).assign(updateTeamDto)
    await this.playerRepository.persistAndFlush(player)

    return player
  }

  async remove(id: string) {
    const player = await this.playerRepository.findOne({ id: id })

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND)
    }

    const res = this.playerRepository.removeAndFlush(player)
    return res
  }
}
