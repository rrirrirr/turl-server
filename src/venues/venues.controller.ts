import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { VenuesService } from './venues.service'
import { CreateVenueDto } from './dto/create-venue.dto'
import { UpdateVenueDto } from './dto/update-venue.dto'

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

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

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(name, updateVenueDto)
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.venuesService.remove(name)
  }
}
