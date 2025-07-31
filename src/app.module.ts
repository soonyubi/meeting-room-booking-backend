import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeetingRoomsModule } from './meeting-rooms/meeting-rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { SeedModule } from './common/seeds/seed.module';
import { User } from './common/entities/user.entity';
import { MeetingRoom } from './common/entities/meeting-room.entity';
import { Booking } from './bookings/entities/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'meeting-room-booking.db',
      entities: [User, MeetingRoom, Booking],
      synchronize: true, // 개발 환경에서만 사용
    }),
    AuthModule,
    MeetingRoomsModule,
    BookingsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
