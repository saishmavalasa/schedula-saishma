import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async create(user: any, dto: CreateDoctorDto) {
    const existing = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (existing) {
      throw new BadRequestException('Doctor profile already exists');
    }

    const doctor = this.doctorRepo.create({
      ...dto,
      user,
    });

    return this.doctorRepo.save(doctor);
  }

  async findOne(user: any) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },

      // ✅ FIXED HERE
      relations: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return doctor;
  }

  async update(user: any, dto: UpdateDoctorDto) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    Object.assign(doctor, dto);
    return this.doctorRepo.save(doctor);
  }
}