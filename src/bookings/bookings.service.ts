import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookingsService {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number) {
    // 시간 충돌 검사
    const conflictingBooking = await this.bookingRepository.findOne({
      where: {
        meetingRoomId: createBookingDto.meetingRoomId,
        date: new Date(createBookingDto.date),
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
      },
    });

    if (conflictingBooking) {
      throw new ConflictException('해당 시간에 이미 예약이 있습니다.');
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      userId,
      date: new Date(createBookingDto.date),
    });

    const savedBooking = await this.bookingRepository.save(booking);

    // WebSocket을 통해 해당 회의실에 예약 알림 전송
    this.server
      .to(`room-${createBookingDto.meetingRoomId}`)
      .emit('booking-created', {
        booking: savedBooking,
        message: '새로운 예약이 생성되었습니다.',
      });

    return savedBooking;
  }

  async findAll() {
    return this.bookingRepository.find({
      relations: ['user', 'meetingRoom'],
      order: { date: 'DESC', startTime: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'meetingRoom'],
    });
  }

  async findByMeetingRoom(meetingRoomId: number, date: string) {
    return this.bookingRepository.find({
      where: {
        meetingRoomId,
        date: new Date(date),
      },
      relations: ['user'],
      order: { startTime: 'ASC' },
    });
  }

  async remove(id: number, userId: number) {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new BadRequestException('예약을 찾을 수 없습니다.');
    }

    if (booking.userId !== userId) {
      throw new BadRequestException('예약을 삭제할 권한이 없습니다.');
    }

    await this.bookingRepository.remove(booking);

    // WebSocket을 통해 예약 삭제 알림 전송
    this.server.to(`room-${booking.meetingRoomId}`).emit('booking-deleted', {
      bookingId: id,
      message: '예약이 삭제되었습니다.',
    });

    return { message: '예약이 삭제되었습니다.' };
  }
}
