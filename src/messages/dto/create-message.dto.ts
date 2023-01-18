import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateMessageDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsOptional()
  @IsDateString()
  sent: string
}
