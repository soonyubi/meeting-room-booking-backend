<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 회의실 예약 시스템 백엔드

회의실 예약을 웹에서 할 수 있는 시스템의 백엔드 API입니다. WebSocket을 통해 실시간으로 예약 상태가 반영되도록 구현되었습니다.

## 주요 기능

- ✅ 로그인 (사원번호 기반)
- ✅ 회의실 목록 조회
- ✅ 회의실 예약 및 관리
- ✅ 실시간 WebSocket 통신
- ✅ 예약 충돌 검사

## 기술 스택

- **Framework**: NestJS
- **Database**: SQLite (TypeORM)
- **WebSocket**: Socket.io
- **Validation**: class-validator, class-transformer
- **Authentication**: bcryptjs

## 설치 및 실행

### 1. 의존성 설치

```bash
yarn install
```

### 2. 개발 서버 실행

```bash
yarn start:dev
```

서버는 `http://localhost:3000`에서 실행됩니다.

### 3. 시드 데이터 실행 (선택사항)

```bash
yarn seed
```

**참고**: 개발 환경에서는 서버 시작 시 자동으로 시드 데이터가 생성됩니다. 데이터베이스에 이미 데이터가 있으면 건너뜁니다.

## API 엔드포인트

### 인증

- `POST /auth/login` - 로그인

### 회의실

- `GET /meeting-rooms` - 회의실 목록 조회
- `GET /meeting-rooms/:id` - 특정 회의실 조회
- `GET /meeting-rooms/:id/status?date=YYYY-MM-DD` - 회의실 상태 조회

### 예약

- `GET /bookings` - 예약 목록 조회
- `POST /bookings` - 예약 생성
- `GET /bookings/:id` - 특정 예약 조회
- `DELETE /bookings/:id` - 예약 삭제
- `GET /bookings/meeting-room/:meetingRoomId?date=YYYY-MM-DD` - 특정 회의실의 예약 조회

## WebSocket 이벤트

### 클라이언트 → 서버

- `join-room` - 회의실 방 참여
- `leave-room` - 회의실 방 나가기

### 서버 → 클라이언트

- `booking-created` - 새 예약 생성 알림
- `booking-deleted` - 예약 삭제 알림

## 시드 데이터

시스템 시작 시 자동으로 다음 데이터가 생성됩니다:

### 사용자

- 사원번호: EMP001, 이름: 김철수, 비밀번호: password123
- 사원번호: EMP002, 이름: 이영희, 비밀번호: password123
- 사원번호: EMP003, 이름: 박민수, 비밀번호: password123

### 회의실

- 1회의실(화상) - 8석
- 2회의실 - 12석
- 3회의실(화상) - 10석
- 4회의실 - 6석
- 5회의실(대회의실) - 20석

## 예약 생성 예시

```json
{
  "date": "2024-01-15",
  "meetingRoomId": 1,
  "startTime": "09:00",
  "endTime": "10:00",
  "title": "팀 미팅"
}
```

## WebSocket 연결 예시

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// 회의실 방 참여
socket.emit('join-room', '1');

// 예약 생성 알림 수신
socket.on('booking-created', (data) => {
  console.log('새 예약:', data);
});

// 예약 삭제 알림 수신
socket.on('booking-deleted', (data) => {
  console.log('예약 삭제:', data);
});
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
