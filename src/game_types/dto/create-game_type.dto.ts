import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateGameTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean
}
