import { Test, TestingModule } from '@nestjs/testing';
import { ExformController } from './exform.controller';
import { ExformService } from './exform.service';

describe('ExformController', () => {
  let controller: ExformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExformController],
      providers: [ExformService],
    }).compile();

    controller = module.get<ExformController>(ExformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
