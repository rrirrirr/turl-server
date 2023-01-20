import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TournamentAdminsService } from './tournament_admins.service'
import { CreateTournamentAdminDto } from './dto/create-tournament_admin.dto'
import { UpdateTournamentAdminDto } from './dto/update-tournament_admin.dto'

@Controller('tournament-admins')
export class TournamentAdminsController {
  constructor(
    private readonly tournamentAdminsService: TournamentAdminsService
  ) {}

  // @Post()
  // create(@Body() createTournamentAdminDto: CreateTournamentAdminDto) {
  //   return this.tournamentAdminsService.create(createTournamentAdminDto)
  // }

  // @Get()
  // findAll(@Query() query: any) {
  //   return this.tournamentAdminsService.findAll(query)
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tournamentAdminsService.findOne(id)
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTournamentAdminDto: UpdateTournamentAdminDto
  // ) {
  //   return this.tournamentAdminsService.update(id, updateTournamentAdminDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tournamentAdminsService.remove(id)
  // }
}
