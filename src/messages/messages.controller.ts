import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'
import { Action } from 'src/abilities/action.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Message })
  @Get()
  findAll(@Query() query: CreateMessageDto) {
    return this.messagesService.findAll(query)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Message })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Message })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Message })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id)
  }
}
