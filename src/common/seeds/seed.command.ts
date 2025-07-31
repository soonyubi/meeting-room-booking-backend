import { Command, CommandRunner } from 'nest-commander';
import { SeedService } from './seed.service';

@Command({
  name: 'seed',
  description: '시드 데이터를 생성합니다.',
})
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedService: SeedService) {
    super();
  }

  async run(): Promise<void> {
    console.log('시드 데이터 생성을 시작합니다...');
    await this.seedService.seed();
    console.log('시드 데이터 생성이 완료되었습니다.');
    process.exit(0);
  }
}
