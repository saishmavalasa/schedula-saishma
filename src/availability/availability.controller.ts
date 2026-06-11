import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Req,
  UseGuards,
  Param,
} from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { CreateRecurringDto } from "./dto/create-recurring.dto";
import { CreateOverrideDto } from "./dto/create-override.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../enums/role.enum";

@Controller("doctor/availability")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.DOCTOR)
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}

  @Post()
  createRecurring(@Body() dto: CreateRecurringDto, @Req() req) {
    return this.service.createRecurring(dto, req.user.id);
  }

  @Get()
  getRecurring(@Req() req) {
    return this.service.getRecurring(req.user.id);
  }

  @Post("override")
  createOverride(@Body() dto: CreateOverrideDto, @Req() req) {
    return this.service.createOverride(dto, req.user.id);
  }
  @Get("date")
  getByDate(@Query("date") date: string, @Req() req) {
    return this.service.getAvailabilityByDate(req.user.id, date);
  }
}