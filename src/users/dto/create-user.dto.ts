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
  Validate,
} from 'class-validator'

import { IsEmailUnique } from 'src/common/validators'

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
  @IsBoolean()
  isAdmin: boolean

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUnique()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsNumberString()
  telephone_num: string
}
