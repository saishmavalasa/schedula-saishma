import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';

import { Role } from '../../enums/role.enum';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}