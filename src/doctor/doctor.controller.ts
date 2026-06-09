import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// ✅ ADD THESE
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.DOCTOR) // ✅ IMPORTANT
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('profile')
  create(@Request() req, @Body() dto: CreateDoctorDto) {
    return this.doctorService.create(req.user, dto);
  }

  @Get('profile')
  findOne(@Request() req) {
    return this.doctorService.findOne(req.user);
  }

  @Patch('profile')
  update(@Request() req, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.update(req.user, dto);
  }
}