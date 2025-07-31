import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { MeetingRoom } from '../entities/meeting-room.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MeetingRoom)
    private meetingRoomRepository: Repository<MeetingRoom>,
  ) {}

  async seed() {
    // 데이터베이스가 비어있는지 확인
    const userCount = await this.userRepository.count();
    const roomCount = await this.meetingRoomRepository.count();

    if (userCount > 0 && roomCount > 0) {
      console.log('시드 데이터가 이미 존재합니다. 건너뜁니다.');
      return;
    }

    console.log('시드 데이터를 생성합니다...');

    // 사용자 시드 데이터
    const users = [
      {
        employeeNumber: 'EMP001',
        name: '김철수',
        password: await bcrypt.hash('password123', 10),
      },
      {
        employeeNumber: 'EMP002',
        name: '이영희',
        password: await bcrypt.hash('password123', 10),
      },
      {
        employeeNumber: 'EMP003',
        name: '박민수',
        password: await bcrypt.hash('password123', 10),
      },
    ];

    for (const userData of users) {
      const existingUser = await this.userRepository.findOne({
        where: { employeeNumber: userData.employeeNumber },
      });
      if (!existingUser) {
        await this.userRepository.save(userData);
        console.log(`사용자 생성: ${userData.name}`);
      }
    }

    // 회의실 시드 데이터
    const meetingRooms = [
      {
        name: '1회의실(화상)',
        capacity: 8,
        description: '화상회의 가능한 8석 회의실',
      },
      {
        name: '2회의실',
        capacity: 12,
        description: '12석 회의실',
      },
      {
        name: '3회의실(화상)',
        capacity: 10,
        description: '화상회의 가능한 10석 회의실',
      },
      {
        name: '4회의실',
        capacity: 6,
        description: '6석 회의실',
      },
      {
        name: '5회의실(대회의실)',
        capacity: 20,
        description: '대회의실',
      },
    ];

    for (const roomData of meetingRooms) {
      const existingRoom = await this.meetingRoomRepository.findOne({
        where: { name: roomData.name },
      });
      if (!existingRoom) {
        await this.meetingRoomRepository.save(roomData);
        console.log(`회의실 생성: ${roomData.name}`);
      }
    }

    console.log('시드 데이터 생성이 완료되었습니다.');
  }
}
