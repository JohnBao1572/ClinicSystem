import { PartialType } from '@nestjs/mapped-types';
import { CreateExaminationScheduleDto } from './create-examination_schedule.dto';

export class UpdateExaminationScheduleDto extends PartialType(CreateExaminationScheduleDto) {}
