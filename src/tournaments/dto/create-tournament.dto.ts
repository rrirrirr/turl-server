import {
  IsBoolean,
  IsDateString,
  IsEmpty,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Timestamp } from 'rxjs'

export class CreateTournamentDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  format: string

  @IsOptional()
  @IsNumber()
  max_num_teams: number

  @IsOptional()
  @IsDateString()
  end_date: string

  @IsOptional()
  @IsDateString()
  start_date: string

  @IsNotEmpty()
  @IsBoolean()
  open: boolean

  @IsOptional()
  @IsJSON()
  standings: any

  @IsNotEmpty()
  @IsString()
  game_type: string

  @IsOptional()
  @IsString()
  description: string
}
