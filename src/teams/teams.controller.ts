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
  Headers,
} from '@nestjs/common'
import { TeamsService } from './teams.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Team } from './entities/team.entity'
import { Action } from 'src/abilities/action.enum'
import { QueryDto } from 'src/common/query.dto'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(
    @Body() createTeamDto: CreateTeamDto,
    @Headers() headers: Record<string, string>
  ) {
    return this.teamsService.create(createTeamDto, headers.invitecode || null)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Team })
  @Get()
  findAll(@Query() query: QueryDto) {
    return query?.team_code
      ? this.teamsService.findByCode(query.team_code)
      : this.teamsService.findAll(query)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Team })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Team })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Team })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id)
  }
}
