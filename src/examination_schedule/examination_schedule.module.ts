import { Module } from '@nestjs/common';
import { ExaminationScheduleService } from './examination_schedule.service';
import { ExaminationScheduleController } from './examination_schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExaminationScheduleEntity } from './entities/examination_schedule.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExaminationScheduleEntity]), ServicesModule],
  controllers: [ExaminationScheduleController],
  providers: [ExaminationScheduleService],
  exports: [ExaminationScheduleService],
})
export class ExaminationScheduleModule {}
