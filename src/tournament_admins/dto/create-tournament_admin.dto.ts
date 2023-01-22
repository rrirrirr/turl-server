import { IsEmpty, IsNotEmpty, IsString } from 'class-validator'

export class CreateTournamentAdminDto {
  @IsNotEmpty()
  @IsString()
  user: string

  @IsNotEmpty()
  @IsString()
  tournament: string
}
