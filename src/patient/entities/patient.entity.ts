import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  contact: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}