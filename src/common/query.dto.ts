import { IsOptional, IsString } from 'class-validator'

export class QueryDto {
  @IsOptional()
  @IsString()
  team_code: string
}
