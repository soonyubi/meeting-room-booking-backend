import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetingRoom } from '../common/entities/meeting-room.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class MeetingRoomsService {
  constructor(
    @InjectRepository(MeetingRoom)
    private meetingRoomRepository: Repository<MeetingRoom>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll() {
    return this.meetingRoomRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.meetingRoomRepository.findOne({
      where: { id, isActive: true },
      relations: ['bookings'],
    });
  }

  async getMeetingRoomStatus(id: number, date: string) {
    const meetingRoom = await this.findOne(id);
    if (!meetingRoom) {
      return null;
    }

    const bookings = await this.bookingRepository.find({
      where: {
        meetingRoomId: id,
        date: new Date(date),
      },
      relations: ['user'],
      order: { startTime: 'ASC' },
    });

    return {
      meetingRoom,
      bookings,
    };
  }
}
