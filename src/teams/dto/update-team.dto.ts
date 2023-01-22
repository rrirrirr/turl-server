import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateTeamDto } from './create-team.dto'

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  team_code: string

  @IsOptional()
  @IsNumber()
  seed: number

  @IsOptional()
  @IsBoolean()
  accepted: boolean
}
