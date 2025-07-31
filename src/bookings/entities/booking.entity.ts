import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { MeetingRoom } from '../../common/entities/meeting-room.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => MeetingRoom, (meetingRoom) => meetingRoom.bookings)
  @JoinColumn({ name: 'meetingRoomId' })
  meetingRoom: MeetingRoom;

  @Column()
  userId: number;

  @Column()
  meetingRoomId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
