import { wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectConnection } from 'nest-knexjs'
import { CreateFormatDto } from './dto/create-format.dto'
import { UpdateFormatDto } from './dto/update-format.dto'
import { Format } from './entities/format.entity'

@Injectable()
export class FormatsService {
  constructor(
    @InjectRepository(Format)
    private readonly formatRepository: EntityRepository<Format>
  ) {}

  async findAll(): Promise<Format[]> {
    const format = await this.formatRepository.findAll()
    return format
  }

  async create(createFormatDto: CreateFormatDto) {
    const format = new Format()
    wrap(format).assign(createFormatDto)
    await this.formatRepository.persistAndFlush(format)
    return format
  }

  async findOne(name: string): Promise<Format> {
    const format = await this.formatRepository.findOne({ name: name })
    return format
  }

  async update(name: string, updateFormatDto: UpdateFormatDto) {
    const format = await this.formatRepository.findOne({ name: name })

    if (!format) {
      throw new HttpException('Format not found', HttpStatus.NOT_FOUND)
    }

    wrap(format).assign(updateFormatDto)
    await this.formatRepository.persistAndFlush(format)

    return format
  }

  async remove(name: string) {
    const format = await this.formatRepository.findOne({ name: name })

    if (!format) {
      throw new HttpException('Format not found', HttpStatus.NOT_FOUND)
    }

    const res = this.formatRepository.removeAndFlush(format)
    return res
  }
}
