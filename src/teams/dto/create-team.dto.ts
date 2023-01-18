import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateTeamDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  team_code: string

  @IsNotEmpty()
  @IsString()
  accepted: boolean

  @IsOptional()
  @IsNumber()
  seed: number

  @IsNotEmpty()
  @IsString()
  tournament_id: string
}
