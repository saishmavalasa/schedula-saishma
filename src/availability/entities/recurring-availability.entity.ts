import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RecurringAvailability {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  doctorId: string;

  @Column()
  dayOfWeek: number; 

  @Column("time")
  startTime: string;

  @Column("time")
  endTime: string;
}