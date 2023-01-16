import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDto {
  @IsEmpty()
  id: string

  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsNumberString()
  telephone_num: string
}
