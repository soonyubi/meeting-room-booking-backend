import { Controller, Get, Param, Query } from '@nestjs/common';
import { MeetingRoomsService } from './meeting-rooms.service';

@Controller('meeting-rooms')
export class MeetingRoomsController {
  constructor(private readonly meetingRoomsService: MeetingRoomsService) {}

  @Get()
  findAll() {
    return this.meetingRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingRoomsService.findOne(+id);
  }

  @Get(':id/status')
  getMeetingRoomStatus(@Param('id') id: string, @Query('date') date: string) {
    return this.meetingRoomsService.getMeetingRoomStatus(+id, date);
  }
}
