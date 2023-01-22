import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common'
import { PlayerService } from './player.service'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto)
  }

  @Get()
  findAll(@Query() query: any, @Request() req: any) {
    return this.playerService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(id, updatePlayerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(id)
  }
}
