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

  @IsOptional()
  @IsString()
  team_code: string

  @IsOptional()
  @IsNumber()
  seed: number

  @IsEmpty()
  accepted: boolean

  @IsNotEmpty()
  @IsString()
  tournament: string
}
