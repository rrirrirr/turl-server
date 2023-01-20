import { Module } from '@nestjs/common'
import { VenuesService } from './venues.service'
import { VenuesController } from './venues.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'
import { Venue } from './entities/venue.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Venue] })],
  controllers: [VenuesController],
  providers: [VenuesService, CaslAbilityFactory],
})
export class VenuesModule {}
