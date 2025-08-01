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

  // 시드 데이터 실행 (개발 및 프로덕션 환경)
  const seedService = app.get(SeedService);
  await seedService.seed();

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
}
bootstrap();
