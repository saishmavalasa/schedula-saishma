import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CustomAvailability {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  doctorId: string;

  @Column("date")
  date: string;

  @Column("time")
  startTime: string;

  @Column("time")
  endTime: string;
}