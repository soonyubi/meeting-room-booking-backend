import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './common/seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('시드 데이터 생성을 시작합니다...');
  const seedService = app.get(SeedService);
  await seedService.seed();

  console.log('시드 데이터 생성이 완료되었습니다.');
  await app.close();
  process.exit(0);
}

bootstrap();
