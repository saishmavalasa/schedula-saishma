import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsString()
  contact: string;
}