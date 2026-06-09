import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async create(user: any, dto: CreatePatientDto) {
    const existing = await this.patientRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (existing) {
      throw new BadRequestException('Patient profile already exists');
    }

    const patient = this.patientRepo.create({
      ...dto,
      user,
    });

    return await this.patientRepo.save(patient);
  }

  async findOne(user: any) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: user.id } },
      relations: {
        user: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return patient;
  }

  async update(user: { id: number }, dto: UpdatePatientDto) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    Object.assign(patient, dto);

    return await this.patientRepo.save(patient);
  }
}