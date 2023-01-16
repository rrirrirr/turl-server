import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { GameTypesService } from './game_types.service'
import { CreateGameTypeDto } from './dto/create-game_type.dto'
import { UpdateGameTypeDto } from './dto/update-game_type.dto'

@Controller('game-types')
export class GameTypesController {
  constructor(private readonly gameTypesService: GameTypesService) {}

  @Post()
  create(@Body() createGameTypeDto: CreateGameTypeDto) {
    return this.gameTypesService.create(createGameTypeDto)
  }

  @Get()
  findAll() {
    return this.gameTypesService.findAll()
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.gameTypesService.findOne(name)
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateGameTypeDto: UpdateGameTypeDto
  ) {
    return this.gameTypesService.update(name, updateGameTypeDto)
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.gameTypesService.remove(name)
  }
}
