import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeedService } from './common/seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 개발 환경에서만 시드 데이터 실행
  if (process.env.NODE_ENV !== 'production') {
    const seedService = app.get(SeedService);
    await seedService.seed();
  }

  await app.listen(3000);
  console.log('서버가 포트 3000에서 실행 중입니다.');
}
bootstrap();
