import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsDateString, IsOptional } from 'class-validator'
import { CreateGameDto } from './create-game.dto'

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsOptional()
  @IsDateString()
  end_date: string

  @IsOptional()
  @IsBoolean()
  active: boolean
}
