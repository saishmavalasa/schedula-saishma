import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('doctor')
export class DoctorController {
    @Get('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.DOCTOR)
    getProfile() {
        return {
            message: 'Welcome Doctor',
        };
    }
}
