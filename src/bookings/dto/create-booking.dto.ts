import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  meetingRoomId: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
