import { IsEmpty, IsNotEmpty, IsString } from 'class-validator'

export class CreatePlayerDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsNotEmpty()
  @IsString()
  team: string
}
