import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationScheduleController } from './examination_schedule.controller';
import { ExaminationScheduleService } from './examination_schedule.service';

describe('ExaminationScheduleController', () => {
  let controller: ExaminationScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExaminationScheduleController],
      providers: [ExaminationScheduleService],
    }).compile();

    controller = module.get<ExaminationScheduleController>(ExaminationScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
