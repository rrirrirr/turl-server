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
import { VenuesService } from './venues.service'
import { CreateVenueDto } from './dto/create-venue.dto'
import { UpdateVenueDto } from './dto/update-venue.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AbilitiesGuard } from 'src/abilities/abilities.guard'
import { CheckAbilities } from 'src/abilities/abilities.decorator'
import { Venue } from './entities/venue.entity'
import { Action } from 'src/abilities/action.enum'

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: Venue })
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto)
  }

  @Get()
  findAll() {
    return this.venuesService.findAll()
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.venuesService.findOne(name)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Venue })
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(name, updateVenueDto)
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: Venue })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.venuesService.remove(name)
  }
}
