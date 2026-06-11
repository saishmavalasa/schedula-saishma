import { IsString } from "class-validator";

export class CreateOverrideDto {
  @IsString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}