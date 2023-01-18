import { Module } from '@nestjs/common'
import { VenuesService } from './venues.service'
import { VenuesController } from './venues.controller'
import { CaslAbilityFactory } from 'src/abilities/casl-ability.factory/casl-ability.factory'

@Module({
  controllers: [VenuesController],
  providers: [VenuesService, CaslAbilityFactory],
})
export class VenuesModule {}
