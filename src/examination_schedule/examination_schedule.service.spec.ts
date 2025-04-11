import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationScheduleService } from './examination_schedule.service';

describe('ExaminationScheduleService', () => {
  let service: ExaminationScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExaminationScheduleService],
    }).compile();

    service = module.get<ExaminationScheduleService>(ExaminationScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
