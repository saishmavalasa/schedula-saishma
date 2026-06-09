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
import { GetDoctorsDto } from './dto/get-doctors.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async create(user: { id: number }, dto: CreateDoctorDto) {
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

  async findOne(user: { id: number }) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
      relations: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return doctor;
  }

  async update(user: { id: number }, dto: UpdateDoctorDto) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    Object.assign(doctor, dto);

    return this.doctorRepo.save(doctor);
  }
  async getDoctors(query: GetDoctorsDto) {
    const {
      specialization,
      search,
      page = 1,
      limit = 10,
      availability,
    } = query;

    const qb = this.doctorRepo.createQueryBuilder('doctor');

    if (specialization) {
      qb.andWhere(
        'LOWER(doctor.specialization) = LOWER(:specialization)',
        { specialization },
      );
    }

    if (search) {
      qb.andWhere(
        'LOWER(doctor.fullName) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (availability) {
      qb.andWhere(
        'LOWER(doctor.availability) = LOWER(:availability)',
        {
          availability,
        },
      );
    }

    qb.skip((page - 1) * limit);
    qb.take(limit);

    const [doctors, total] =
      await qb.getManyAndCount();

    if (!doctors.length) {
      return {
        message: 'No doctors found',
        data: [],
        total: 0,
      };
    }

    return {
      data: doctors,
      total,
      page,
      limit,
    };
  }

  async getDoctorById(id: number) {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    return doctor;
  }
}