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
import { TeamsService } from './teams.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Team } from './entities/team.entity'
import { Action } from 'src/abilities/action.enum'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto)
  }

  @Get()
  findAll(@Query() query: CreateTeamDto) {
    return this.teamsService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Team })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Team })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id)
  }
}
