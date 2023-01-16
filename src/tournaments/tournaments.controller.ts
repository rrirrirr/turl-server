import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common'
import { TournamentsService } from './tournaments.service'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { CreateTeamDto } from 'src/teams/dto/create-team.dto'
import { v4 as uuid } from 'uuid'

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create({
      ...createTournamentDto,
      id: uuid(),
    })
  }

  @Get()
  findAll(@Query() query: any) {
    return this.tournamentsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto
  ) {
    return this.tournamentsService.update(+id, updateTournamentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id)
  }
}
