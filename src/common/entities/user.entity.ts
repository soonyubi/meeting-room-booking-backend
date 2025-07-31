import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employeeNumber: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
