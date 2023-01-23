import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsOptional } from 'class-validator'
import { Result } from 'src/games/entities/game.entity'
import { CreateGameTypeDto } from './create-game_type.dto'

export class UpdateGameTypeDto extends PartialType(CreateGameTypeDto) {
  @IsOptional()
  @IsBoolean()
  active: boolean

  @IsOptional()
  @IsBoolean()
  result: Result
}
