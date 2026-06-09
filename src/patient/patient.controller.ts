import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.PATIENT)
@Controller('patient/profile')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Req() req, @Body() dto: CreatePatientDto) {
    return this.patientService.create(req.user, dto);
  }

  @Get()
  find(@Req() req) {
    return this.patientService.findOne(req.user);
  }

  @Patch()
  update(@Req() req, @Body() dto: UpdatePatientDto) {
    return this.patientService.update(req.user, dto);
  }
}