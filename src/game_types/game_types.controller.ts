import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { GameTypesService } from './game_types.service'
import { CreateGameTypeDto } from './dto/create-game_type.dto'
import { UpdateGameTypeDto } from './dto/update-game_type.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { GameType } from './entities/game_type.entity'
import { Action } from 'src/abilities/action.enum'

@Controller('game-types')
export class GameTypesController {
  constructor(private readonly gameTypesService: GameTypesService) {}

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: GameType })
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

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: GameType })
  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateGameTypeDto: UpdateGameTypeDto
  ) {
    return this.gameTypesService.update(name, updateGameTypeDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: GameType })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.gameTypesService.remove(name)
  }
}
