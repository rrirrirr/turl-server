import {
  IsArray,
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

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  court: string

  @IsOptional()
  @IsJSON()
  result: Result

  @IsOptional()
  @IsDateString()
  start_date: string

  @IsOptional()
  @IsString()
  venue: string

  @IsNotEmpty()
  @IsArray()
  teams: string[]

  @IsOptional()
  @IsString()
  tournament: string
}
