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
import { GamesService } from './games.service'
import { CreateGameDto } from './dto/create-game.dto'
import { UpdateGameDto } from './dto/update-game.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Game } from './entities/game.entity'
import { Action } from 'src/abilities/action.enum'

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Game })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto)
  }

  @Get()
  findAll(@Query() query: CreateGameDto) {
    return this.gamesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Game })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Game })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id)
  }
}
