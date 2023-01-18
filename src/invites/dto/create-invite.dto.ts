import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateInviteDto {
  @IsNotEmpty()
  id: string

  @IsOptional()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  code: string

  @IsOptional()
  @IsString()
  expiration_date: string

  @IsNotEmpty()
  @IsString()
  unique: boolean

  @IsNotEmpty()
  @IsString()
  used: boolean

  @IsNotEmpty()
  @IsString()
  tournament_id: string
}
