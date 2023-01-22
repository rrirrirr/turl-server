import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateInviteDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsDateString()
  expiration_date: string

  @IsNotEmpty()
  @IsBoolean()
  unique: boolean

  @IsNotEmpty()
  @IsString()
  tournament: string
}
