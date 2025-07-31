import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingRoomsService } from './meeting-rooms.service';
import { MeetingRoomsController } from './meeting-rooms.controller';
import { MeetingRoom } from '../common/entities/meeting-room.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingRoom, Booking])],
  controllers: [MeetingRoomsController],
  providers: [MeetingRoomsService],
  exports: [MeetingRoomsService],
})
export class MeetingRoomsModule {}
