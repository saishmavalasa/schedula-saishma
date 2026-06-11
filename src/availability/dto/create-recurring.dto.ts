import { IsNumber, IsString } from "class-validator";

export class CreateRecurringDto {
  @IsNumber()
  dayOfWeek: number;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}