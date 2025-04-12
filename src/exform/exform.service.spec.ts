import { Test, TestingModule } from '@nestjs/testing';
import { ExformService } from './exform.service';

describe('ExformService', () => {
  let service: ExformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExformService],
    }).compile();

    service = module.get<ExformService>(ExformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
