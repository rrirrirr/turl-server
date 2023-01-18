import {
  IsDateString,
  IsEmpty,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { Result } from '../entities/game.entity'

export class CreateGameDto {
  @IsEmpty()
  id: string

  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  court: string

  @IsOptional()
  @IsJSON()
  result: Result

  @IsOptional()
  @IsDateString()
  start_date: string

  @IsNotEmpty()
  @IsString()
  venue: string

  @IsOptional()
  @IsString()
  tournament_id: string
}
