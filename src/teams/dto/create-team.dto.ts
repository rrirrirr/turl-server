import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { CreatePlayerDto } from 'src/player/dto/create-player.dto'
import { Application } from '../entities/team.entity'

export class CreateTeamDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  team_code: string

  @IsOptional()
  @IsNumber()
  seed: number

  @IsOptional()
  @IsArray()
  player: CreatePlayerDto[]

  @IsEmpty()
  accepted: Application

  @IsNotEmpty()
  @IsString()
  tournament: string
}
