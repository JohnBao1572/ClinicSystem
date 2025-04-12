import { Module } from '@nestjs/common';
import { ExformService } from './exform.service';
import { ExformController } from './exform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExformEntity } from './entities/exform.entity';
import { ExFormMedicinesEntity } from './entities/exformmed.entity';
import { ExaminationScheduleModule } from 'src/examination_schedule/examination_schedule.module';
import { MedicinesModule } from 'src/medicines/medicines.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExformEntity, ExFormMedicinesEntity]),ExaminationScheduleModule, MedicinesModule],
  controllers: [ExformController],
  providers: [ExformService],
  exports:[ExformService]
})
export class ExformModule {}
