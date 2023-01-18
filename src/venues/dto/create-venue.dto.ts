import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateVenueDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsDateString()
  start_date: string

  @IsOptional()
  @IsDateString()
  end_date: string
}
