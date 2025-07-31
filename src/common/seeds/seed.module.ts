import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';
import { User } from '../entities/user.entity';
import { MeetingRoom } from '../entities/meeting-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MeetingRoom])],
  providers: [SeedService, SeedCommand],
  exports: [SeedService],
})
export class SeedModule {}
