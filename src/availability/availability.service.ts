import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RecurringAvailability } from "./entities/recurring-availability.entity";
import { CustomAvailability } from "./entities/custom-availability.entity";
import { CreateRecurringDto } from "./dto/create-recurring.dto";
import { CreateOverrideDto } from "./dto/create-override.dto";

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,

    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,
  ) {}

  private isOverlapping(
    startA: string,
    endA: string,
    startB: string,
    endB: string,
  ): boolean {
    return startA < endB && startB < endA;
  }

  async createRecurring(
    dto: CreateRecurringDto,
    doctorId: string,
  ): Promise<RecurringAvailability> {
    const { dayOfWeek, startTime, endTime } = dto;

    if (startTime >= endTime) {
      throw new BadRequestException("Invalid time range");
    }

    const existing = await this.recurringRepo.find({
      where: { doctorId, dayOfWeek },
    });

    for (const slot of existing) {
      if (
        this.isOverlapping(
          startTime,
          endTime,
          slot.startTime,
          slot.endTime,
        )
      ) {
        throw new BadRequestException("Overlapping recurring slot");
      }
    }

    return this.recurringRepo.save({
      doctorId,
      dayOfWeek,
      startTime,
      endTime,
    });
  }

  async getRecurring(
    doctorId: string,
  ): Promise<RecurringAvailability[]> {
    return this.recurringRepo.find({
      where: { doctorId },
    });
  }

  async createOverride(
    dto: CreateOverrideDto,
    doctorId: string,
  ): Promise<CustomAvailability> {
    const { date, startTime, endTime } = dto;

    if (startTime >= endTime) {
      throw new BadRequestException("Invalid time range");
    }

    const existing = await this.customRepo.find({
      where: { doctorId, date },
    });

    for (const slot of existing) {
      if (
        this.isOverlapping(
          startTime,
          endTime,
          slot.startTime,
          slot.endTime,
        )
      ) {
        throw new BadRequestException("Overlapping override slot");
      }
    }

    return this.customRepo.save({
      doctorId,
      date,
      startTime,
      endTime,
    });
  }

  async getAvailabilityByDate(
    doctorId: string,
    date: string,
  ): Promise<CustomAvailability[] | RecurringAvailability[]> {
    const dayOfWeek = new Date(date).getDay();

    const overrides = await this.customRepo.find({
      where: { doctorId, date },
    });

    if (overrides.length > 0) {
      return overrides;
    }

    return this.recurringRepo.find({
      where: { doctorId, dayOfWeek },
    });
  }
}