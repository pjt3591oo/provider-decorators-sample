import { Test, TestingModule } from '@nestjs/testing';
import { OpenbankingService } from './openbanking.service';

describe('OpenbankingService', () => {
  let service: OpenbankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenbankingService],
    }).compile();

    service = module.get<OpenbankingService>(OpenbankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
