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
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common'
import { TournamentsService } from './tournaments.service'
import { CreateTournamentDto } from './dto/create-tournament.dto'
import { UpdateTournamentDto } from './dto/update-tournament.dto'
import { Tournament } from './entities/tournament.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { TournamentAdminsService } from 'src/tournament_admins/tournament_admins.service'
import { ForbiddenError } from '@casl/ability'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { Action } from 'src/abilities/action.enum'

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Tournament })
  @Post()
  async create(
    @Body() createTournamentDto: CreateTournamentDto,
    @Request() req: any
  ) {
    const user = req.user
    const tournament = await this.tournamentsService.create(
      createTournamentDto,
      user
    )
    return tournament
  }

  @Get()
  findAll(@Query() query: any, @Request() req: any) {
    const user = req.user
    return this.tournamentsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
    @Request() req: any
  ) {
    const user = req.user
    try {
      return this.tournamentsService.update(id, updateTournamentDto, user)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const user = req.user
    try {
      return this.tournamentsService.remove(id, user)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
