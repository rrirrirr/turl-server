import { wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/sqlite'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateVenueDto } from './dto/create-venue.dto'
import { UpdateVenueDto } from './dto/update-venue.dto'
import { Venue } from './entities/venue.entity'

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: EntityRepository<Venue>
  ) {}

  async findAll(): Promise<Venue[] | undefined> {
    const venue = await this.venueRepository.findAll()
    return venue
  }

  async create(createVenueDto: CreateVenueDto) {
    const venue = new Venue()
    wrap(venue).assign(createVenueDto)
    await this.venueRepository.persistAndFlush(venue)
    return venue
  }

  async findOne(name: string): Promise<Venue> {
    const venue = await this.venueRepository.findOne({ name: name })
    return venue
  }

  async update(name: string, updateVenueDto: UpdateVenueDto) {
    const venue = await this.venueRepository.findOne({ name: name })

    if (!venue) {
      throw new HttpException('Venue not found', HttpStatus.NOT_FOUND)
    }

    wrap(venue).assign(updateVenueDto)
    await this.venueRepository.persistAndFlush(venue)

    return venue
  }

  async remove(name: string) {
    const venue = await this.venueRepository.findOne({ name: name })

    if (!venue) {
      throw new HttpException('Venue not found', HttpStatus.NOT_FOUND)
    }

    const res = this.venueRepository.removeAndFlush(venue)
    return res
  }
}
