import { wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: EntityRepository<Message>
  ) {}

  async findAll(queries: CreateMessageDto) {
    const message = await this.messageRepository.findAll()
    return message
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = new Message()
    wrap(message).assign(createMessageDto)
    await this.messageRepository.persistAndFlush(message)
    return message
  }

  async findOne(id: string) {
    const message = await this.messageRepository.findOne({ id: id })
    return message
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({ id: id })

    if (!message) {
      throw new HttpException('Game type not found', HttpStatus.NOT_FOUND)
    }

    wrap(message).assign(updateMessageDto)
    await this.messageRepository.persistAndFlush(message)

    return message
  }

  async remove(id: string) {
    const message = await this.messageRepository.findOne({ id: id })

    if (!message) {
      throw new HttpException('Game type not found', HttpStatus.NOT_FOUND)
    }

    const res = this.messageRepository.removeAndFlush(message)
    return res
  }
}
