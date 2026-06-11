import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Role } from '../../enums/role.enum';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

<<<<<<< HEAD
 // @OneToOne(() => Doctor, (doctor) => doctor.user)
//  doctor: Doctor;
=======
  
  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;
>>>>>>> 0565ff7 (final fix: correct entities + availability module)

 // @OneToOne(() => Patient, (patient) => patient.user)
 // patient: Patient;
}