import { Test, TestingModule } from '@nestjs/testing';
import { OpenbankingController } from './openbanking.controller';

describe('OpenbankingController', () => {
  let controller: OpenbankingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenbankingController],
    }).compile();

    controller = module.get<OpenbankingController>(OpenbankingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
