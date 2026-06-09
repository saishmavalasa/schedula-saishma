import { IsString, IsNumber } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  fullName: string;

  @IsString()
  specialization: string;

  @IsNumber()
  experience: number;

  @IsString()
  qualification: string;

  @IsNumber()
  consultationFee: number;

  @IsString()
  availability: string;
}