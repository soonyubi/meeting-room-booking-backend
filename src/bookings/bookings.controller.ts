import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    // 실제로는 JWT 가드를 사용해야 함
    const userId = req.user?.id || 1; // 임시로 사용자 ID 1 사용
    return this.bookingsService.create(createBookingDto, userId);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Get('meeting-room/:meetingRoomId')
  findByMeetingRoom(
    @Param('meetingRoomId') meetingRoomId: string,
    @Request() req,
  ) {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    return this.bookingsService.findByMeetingRoom(+meetingRoomId, date);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id || 1; // 임시로 사용자 ID 1 사용
    return this.bookingsService.remove(+id, userId);
  }
}
