import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  qualification: string;

  @Column('decimal')
  consultationFee: number;

  @Column()
  availability: string;

  @Column({ nullable: true })
  profileDetails: string;

 @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}