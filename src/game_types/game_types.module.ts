import { Module } from '@nestjs/common';
import { GameTypesService } from './game_types.service';
import { GameTypesController } from './game_types.controller';

@Module({
  controllers: [GameTypesController],
  providers: [GameTypesService]
})
export class GameTypesModule {}
